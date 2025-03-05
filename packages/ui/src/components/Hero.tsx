import { PropsWithChildren } from 'react';

export const Hero = ({
  title,
  subtitle,
  children,
}: { title: string; subtitle?: string } & PropsWithChildren) => {
  return (
    <section className="py-4 text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-1">{title}</h1>
          {subtitle && <p className="text-md mb-8">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  );
};
