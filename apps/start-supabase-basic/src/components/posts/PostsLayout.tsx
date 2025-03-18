import { ReactNode } from 'react';

export const PostsLayout = ({ children }: { children: ReactNode }) => (
  <main className="flex justify-center antialiased mt-10 px-4">
    <div className="flex flex-col md:flex-row flex-col-reverse  max-w-[1000px]">
      {children}
    </div>
  </main>
)
