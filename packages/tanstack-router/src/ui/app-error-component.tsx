import { ErrorComponent, ErrorComponentProps } from '@tanstack/react-router';

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}
