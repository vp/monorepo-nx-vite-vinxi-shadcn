import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { SignUpForm } from '@workspace/users-ui/components/sign-up-form';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/integrations/trpc/react';

export const SignUp = () => {
   const trpc = useTRPC();

  const signupMutation = useMutation(trpc.user.signUp.mutationOptions() );

  return (
    <SignUpForm
      actionText="Sign Up"
      status={signupMutation.status}
      onSubmit={(data) => {
        void signupMutation.mutate(data);
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
