import '@workspace/ui/globals.css';
import { Button } from '@workspace/ui/components/button';
import { Hero } from '@workspace/ui/components/Hero';

export function App() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <Hero title="Welcome @workspace/my-app">
          <Button size="sm">Button</Button>
        </Hero>
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">How its going?</h1>
           
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
