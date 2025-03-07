import { ThemeProvider } from '@workspace/ui/components/ui/theme-provider';
import { ThemeToggle } from '@workspace/ui/components/ui/theme-toggle';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@workspace/ui/components/ui/card';
import { AccordionDemo } from '@workspace/ui/components/blocks/accordion-demo';
import { ComponentWrapper } from '@workspace/ui/components/blocks/component-wrapper';
import Products from '@workspace/ui/components/blocks/products';
import DashboardPage from '@workspace/ui/components/blocks/dashboard-page';
import { SonnerDemo } from '@/components/sonner-demo';
import { Toaster } from '@workspace/ui/components/ui/sonner';


function App() {
  return (
    <ThemeProvider>
      <div className="bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2">
        <header className="p-4">
          <ThemeToggle /> Welcome @workspace/my-app
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">10,234</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$52,234</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">24</p>
              </CardContent>
            </Card>

            <ComponentWrapper name="Accordion">
              <AccordionDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Accordion">
              <SonnerDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Accordion">
              <AccordionDemo />
            </ComponentWrapper>
          </div>
          <main className="pt-6">
            <div className="grid grid-cols-1">
              <ComponentWrapper name="Products">
                <Products />
              </ComponentWrapper>
            </div>
          </main>
          <main className="pt-6">
            <div className="grid grid-cols-1">
              <ComponentWrapper name="DashboardPage">
                <DashboardPage />
              </ComponentWrapper>
            </div>
          </main>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
