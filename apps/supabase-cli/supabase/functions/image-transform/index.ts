// supabase/functions/image-transform/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.38.4';

import {
  ImageMagick,
  initializeImageMagick,
} from 'npm:@imagemagick/magick-wasm';

const wasmBytes = await Deno.readFile(
  new URL('magick.wasm', import.meta.resolve('npm:@imagemagick/magick-wasm'))
);

await initializeImageMagick(wasmBytes);

serve(async (req) => {
  const url = new URL(req.url);
  const imageKey = url.searchParams.get("key");
  const width = parseInt(url.searchParams.get("width") || "0");
  const height = parseInt(url.searchParams.get("height") || "0");

  if (!width || !height) {
    return new Response("Width and height are required", { status: 400 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Get original image
  const { data, error } = await supabase
    .storage
    .from("images")
    .download(imageKey);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const arrayBuffer = await data.arrayBuffer();

  let result = ImageMagick.read(new Uint8Array(arrayBuffer), (img) => {
    img.resize(width, height); // Resize

    return img.write((data) => data);
  });

  return new Response(result, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000",
    },
  });
});
