import { useServerFn } from '@tanstack/react-start';
import { signUp } from '~/features/auth/libs/sign-up';
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { SignUpForm } from '@workspace/users-ui/components/sign-up-form';
import { useMutation } from '@tanstack/react-query';

export const SignUp = () => {
  const signupMutation = useMutation({
    mutationFn: useServerFn(signUp),
  });

  return (
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
  );
};
