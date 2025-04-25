import { SignIn } from '@/integrations/user/components/SignIn';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignIn,
});
