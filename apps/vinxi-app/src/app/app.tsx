import { ThemeToggle } from '@workspace/ui/components/ui/theme-toggle';
import { ThemeProvider } from '@workspace/ui/components/ui/theme-provider';

export function App() {
  return (
    <ThemeProvider>
      <div className="bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2">
        <header className="p-4 border-b-2">
          <ThemeToggle /> <h1 className="pl-2 text-lg font-bold inline">Welcome vinxi-app!</h1>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
