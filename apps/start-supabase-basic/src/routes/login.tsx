import { createFileRoute } from '@tanstack/react-router';
import { Login } from '~/components/Login';
import { CenterPageLayout } from '~/components/CenterPageLayout';

export const Route = createFileRoute('/login')({
  component: LoginComp,
});

function LoginComp() {
  return (
    <CenterPageLayout>
      <Login />
    </CenterPageLayout>
  );
}
