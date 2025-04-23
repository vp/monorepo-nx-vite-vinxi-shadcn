import { ReactNode } from "react";

export const AppHeader = ({left, right}: {left: ReactNode, right?: ReactNode}) => (
    <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
    <div className="flex h-14 w-full items-center gap-2 px-4">
      {left}
      {right && (
        <div className="ml-auto flex items-center gap-2">
          {right}
        </div>
      )}
    </div>
  </header>
)