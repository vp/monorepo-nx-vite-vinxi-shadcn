export function CenterPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 justify-center">
      <div className="flex max-w-md flex-col w-[400px]">{children}</div>
    </div>
  );
}
