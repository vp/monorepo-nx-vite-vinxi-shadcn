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

interface UpdateFormValues {
  id: string;
  firstName?: string;
  lastName?: string;
}

export function UpdateForm({
  actionText,
  onSubmit,
  status,
  afterSubmit,
  header,
  footer,
  data,
}: {
  actionText: string;
  onSubmit: (data: UpdateFormValues) => void;
  status: 'pending' | 'idle' | 'success' | 'error';
  afterSubmit?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  data?: UpdateFormValues | null;
}) {
  const form = useForm({
    defaultValues: {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
    },
    onSubmit: async ({ value }) => {
      onSubmit({id: data.id, ...value});
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
