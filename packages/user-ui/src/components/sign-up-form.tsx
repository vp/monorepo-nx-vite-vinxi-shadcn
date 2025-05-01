import {
  Card,
  CardContent,
  CardFooter,
} from '@workspace/ui/components/ui/card';
import { Label } from '@workspace/ui/components/ui/label';
import { Button } from '@workspace/ui/components/ui/button';
import { Input } from '@workspace/ui/components/ui/input';
import { Alert, AlertTitle } from '@workspace/ui/components/ui/alert';
import { useForm } from '@tanstack/react-form';
import { ReactNode } from 'react';

interface SignUpFormValues {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export function SignUpForm({
  actionText,
  onSubmit,
  status,
  afterSubmit,
  header,
  footer,
}: {
  actionText: string;
  onSubmit: (data: SignUpFormValues) => void;
  status: 'pending' | 'idle' | 'success' | 'error';
  afterSubmit?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}) {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <Card>
        {header}
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <form.Field
                name="email"
                children={(field) => (
                  <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              />
            </div>
            <div className="grid gap-2">
              <form.Field
                name="password"
                children={(field) => (
                  <div className="flex flex-col gap-2">
                    <Label>Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              />
            </div>
            <div className="grid gap-2">
              <form.Field
                name="firstName"
                children={(field) => (
                  <div className="flex flex-col gap-2">
                    <Label>First name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              />
            </div>
            <div className="grid gap-2">
              <form.Field
                name="lastName"
                children={(field) => (
                  <div className="flex flex-col gap-2">
                    <Label>Last name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? '...' : actionText}
          </Button>
          {afterSubmit ? (
            <Alert>
              <AlertTitle>{afterSubmit}</AlertTitle>
            </Alert>
          ) : null}
          {footer}
        </CardFooter>
      </Card>
    </form>
  );
}
