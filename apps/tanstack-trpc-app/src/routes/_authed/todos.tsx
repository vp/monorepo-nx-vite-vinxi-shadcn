import { useTRPC } from '@/integrations/trpc/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Todos } from '@workspace/todos-ui/components/Todos';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { useMemo } from 'react';

export const Route = createFileRoute('/_authed/todos')({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery(trpc.todos.getTodos.queryOptions());
  const deleteMutation = useMutation({
    ...trpc.todos.deleteTodo.mutationOptions(),
    onSuccess: () => {
      // Invalidate the query to refetch the todos
      queryClient.invalidateQueries({
        queryKey: trpc.todos.getTodos.queryKey(),
      });
    },
  });

  const addMutation = useMutation({
    ...trpc.todos.addTodo.mutationOptions(),
    onSuccess: () => {
      // Invalidate the query to refetch the todos
      queryClient.invalidateQueries({
        queryKey: trpc.todos.getTodos.queryKey(),
      });
    },
  });

  const updateMutation = useMutation({
    ...trpc.todos.updateTodo.mutationOptions(),
    onSuccess: () => {
      // Invalidate the query to refetch the todos
      queryClient.invalidateQueries({
        queryKey: trpc.todos.getTodos.queryKey(),
      });
    },
  });

  const errors = useMemo(() => {
    const errorList = [
      deleteMutation.error,
      addMutation.error,
      updateMutation.error,
    ]
      .filter((error) => error !== null)
      .map((error) => error?.message);
    return errorList.length > 0 ? errorList : [];
  }, [deleteMutation.error, addMutation.error, updateMutation.error]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>My todos's</CardTitle>
      </CardHeader>
      <CardContent>
        <Todos
          todos={todos}
          onAdd={addMutation.mutate}
          onDelete={deleteMutation.mutate}
          onUpdate={updateMutation.mutate}
          isLoading={isLoading}
          errors={errors}
        />
      </CardContent>
    </Card>
  );
}
