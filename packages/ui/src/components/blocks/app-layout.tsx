import { PropsWithChildren } from "react";

export const AppLayout = ({children}: PropsWithChildren) => (
    <div className="flex flex-1 flex-col h-screen">
        {children}
    </div>
)