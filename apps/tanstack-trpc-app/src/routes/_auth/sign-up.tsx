import { SignUp } from '@/integrations/user/components/sign-up';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUp,
});
