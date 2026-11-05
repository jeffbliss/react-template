import type { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div>
      {title ? (
        <header>
          <h1>{title}</h1>
        </header>
      ) : null}
      <main>{children}</main>
    </div>
  );
};
