import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { AuthForm } from '@workspace/user-ui/components/auth-form';
import { signIn } from '@/integrations/user/fn/sign-in';
import { useServerFn } from '@tanstack/react-start';
import { signUp } from '@/integrations/user/fn/sign-up';

export function SignIn() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (ctx) => {
      if (!ctx?.error) {
        await router.invalidate();
        router.navigate({ to: '/' });
        return;
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: useServerFn(signUp),
  });

  return (
    <AuthForm
      actionText="Login"
      status={loginMutation.status}
      onSubmit={(data) => {
        loginMutation.mutate({ data });
      }}
      afterSubmit={
        loginMutation.data ? (
          <>
            <div className="text-red-400">{loginMutation.data.message}</div>
            {loginMutation.data.error &&
            loginMutation.data.message === 'Invalid login credentials' ? (
              <div>
                <button
                  className="text-blue-500"
                  onClick={(e) => {
                    const formData = new FormData(
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      (e.target as HTMLButtonElement).form!
                    );

                    signupMutation.mutate({
                      data: {
                        email: formData.get('email') as string,
                        password: formData.get('password') as string,
                      },
                    });
                  }}
                  type="button"
                >
                  Sign up instead?
                </button>
              </div>
            ) : null}
          </>
        ) : null
      }
      header={
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
      }
      footer={
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      }
    />
  );
}
