import { ThemeProvider } from '@workspace/ui/components/blocks/theme-provider';
import { Layout } from '@/components/blocks/layout';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('TEST', process.env.TEST);
console.log('import.meta.env.MODE', import.meta.env.MODE);
console.log('import.meta.env.VITE_TEST', import.meta.env.VITE_TEST);
console.log('import.meta.env.NITRO_TEST', import.meta.env.NITRO_TEST);

export function App() {
  return (
    <ThemeProvider>
      <Layout>
        <div className="bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2">
          <header className="p-4 border-b-2">
            <h1 className="pl-2 text-lg font-bold inline">
              Welcome vinxi-app!
            </h1>
          </header>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
