import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { TodolistAddForm } from '@workspace/todos-ui/components/todolist-add-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/integrations/trpc/react';

export const TodoListAddCard = ({ className }: { className?: string }) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    ...trpc.todos.addTodolist.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.todos.getTodolistsWithTodos.queryKey(),
      });
    },
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Add Todo List</CardTitle>
        <CardDescription>Click to add a new todo list</CardDescription>
      </CardHeader>
      <CardContent>
        <TodolistAddForm onSubmit={mutateAsync} />
      </CardContent>
    </Card>
  );
};
