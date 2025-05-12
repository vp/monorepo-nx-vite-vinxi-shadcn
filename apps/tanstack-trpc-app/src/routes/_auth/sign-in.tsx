import { SignIn } from '@/integrations/user/components/sign-in';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignIn,
});
