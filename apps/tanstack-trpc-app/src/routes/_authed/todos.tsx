import { TodoListAddCard } from '@/integrations/todos/components/todolist-add-card';
import { useTRPC } from '@/integrations/trpc/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Todos } from '@workspace/todos-ui/components/todos';
import { TodoToAdd } from '@workspace/todos-ui/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { Spinner } from '@workspace/ui/components/ui/spinner';
import { useMemo } from 'react';

export const Route = createFileRoute('/_authed/todos')({
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.todos.getTodolistsWithTodos.queryOptions()
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: todolists, isLoading } = useQuery(
    trpc.todos.getTodolistsWithTodos.queryOptions()
  );

  const deleteMutation = useMutation({
    ...trpc.todos.deleteTodo.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.todos.getTodolistsWithTodos.queryKey(),
      });
    },
  });

  const addMutation = useMutation({
    ...trpc.todos.addTodo.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.todos.getTodolistsWithTodos.queryKey(),
      });
    },
  });

  const updateMutation = useMutation({
    ...trpc.todos.updateTodo.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.todos.getTodolistsWithTodos.queryKey(),
      });
    },
  });

  const errors = useMemo(() => {
    const errorList = [
      deleteMutation.error,
      addMutation.error,
      updateMutation.error,
    ]
      .filter(Boolean)
      .map((error) => error?.message || 'An unknown error occurred')
      .filter(Boolean);

    return errorList;
  }, [deleteMutation.error, addMutation.error, updateMutation.error]);

  const handleAdd = async (todolist_id: number, todo: TodoToAdd) =>
    addMutation.mutateAsync({
      ...todo,
      todolist_id,
    });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <TodoListAddCard className="bg-accent/10 text-accet-foreground/10" />
        {todolists?.map(({ id, title, description, todos }) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
              {todos && (
                <Todos
                  todos={todos}
                  onAdd={async (todo) => handleAdd(id, todo)}
                  onDelete={deleteMutation.mutateAsync}
                  onUpdate={updateMutation.mutateAsync}
                  errors={errors}
                />
              )}
            </CardContent>
          </Card>
        ))}
        {(!todolists || todolists.length === 0) && (
          <Card>
            <CardContent className="py-4">
              <p className="text-center text-muted-foreground">
                No todo lists found.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
