import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn, useServerFn } from '@tanstack/react-start';
import { useMutation } from '~/hooks/useMutation';
import { getSupabaseServerClient } from '~/utils/supabase';
import { AuthForm } from '~/components/AuthForm';
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { CenterPageLayout } from '~/components/CenterPageLayout';

export const signupFn = createServerFn()
  .validator(
    (d: unknown) =>
      d as { email: string; password: string; redirectUrl?: string }
  )
  .handler(async ({ data }) => {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    // Redirect to the prev page stored in the "redirect" search param
    throw redirect({
      href: data.redirectUrl || '/',
    });
  });

export const Route = createFileRoute('/signup')({
  component: SignupComp,
});

function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  });

  return (
    <CenterPageLayout>
      <AuthForm
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
