import { describe, it, expect } from 'vitest';
import { ViteTrpcHeadersPlugin, viteTrpcPlugin } from './../src/index.js';

/**
 * Calls a Vite plugin hook that may be a function or an object with a handler.
 */
function callPluginHook<T extends (...args: any[]) => any>(
    hook: T | { handler: T } | undefined,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    if (typeof hook === 'function') {
      return hook(...args);
    }
    if (hook && typeof hook === 'object' && 'handler' in hook && typeof hook.handler === 'function') {
      return hook.handler(...args);
    }
    return undefined;
  }

describe('viteTrpcPlugin', () => {
  const plugin: ViteTrpcHeadersPlugin = viteTrpcPlugin();

  it('should have the correct plugin name', () => {
    expect(plugin.name).toBe('vite-plugin-trpc');
  });

  it('should transform code when id includes "trcp-server-headers" and is client', () => {
    const code = 'some code';
    const id = '/path/to/trcp-server-headers.ts';

    callPluginHook(plugin.configResolved, {
      router: {
        name: 'client',
      },
    } as any);

    const result = callPluginHook(plugin.transform, code, id);

    expect(result).toEqual({
      code: 'export const getTrpcServerHeaders = () => ({});',
      map: null,
    });
  });

   it('should not transform code when id includes "trcp-server-headers" but is ssr', () => {
    const code = 'some code';
    const id = '/path/to/trcp-server-headers.ts';

    callPluginHook(plugin.configResolved, {
      router: {
        name: 'ssr',
      },
    } as any);

    const result = callPluginHook(plugin.transform, code, id);

    expect(result).not.toEqual({
      code: 'export const getTrpcServerHeaders = () => ({});',
      map: null,
    });
  });

  it('should return null when id does not include "trcp-server-headers"', () => {
    const code = 'some code';
    const id = '/path/to/other-file.ts';

    const result =callPluginHook(plugin.transform, code, id);

    expect(result).toBeNull();
  });
});