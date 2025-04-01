import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useMutation } from '~/hooks/useMutation';

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { CenterPageLayout } from '~/components/CenterPageLayout';
import { SignUpForm } from '@workspace/users-ui/components/sign-up-form';
import { signUp } from '~/libs/user/sign-up';

export const Route = createFileRoute('/signup')({
  component: SignupComp,
});

function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signUp),
  });

  return (
    <CenterPageLayout>
      <SignUpForm
        actionText="Sign Up"
        status={signupMutation.status}
        onSubmit={(data) => {
          void signupMutation.mutate({
            data,
          });
        }}
        afterSubmit={
          signupMutation.data?.error ? (
            <div className="text-red-400">{signupMutation.data.message}</div>
          ) : null
        }
        header={
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Enter your email and password</CardDescription>
          </CardHeader>
        }
      />
    </CenterPageLayout>
  );
}
