export type Todo = {
  id: number;
  inserted_at: string;
  is_complete: boolean | null;
  task: string| null;
};

export type TodoToAdd = {
  is_complete?: boolean;
  task: string;
};

export type TodoToUpdate = {
  id: number;
  is_complete?: boolean;
  task?: string;
};

export type TodoOnDelete = (
  args: { id: number }
) => void;

export type TodoOnUpdate = (
  todo: TodoToUpdate
) => void;

export type TodoOnAdd = (
  todo: TodoToAdd
) => void;

export type TodoOnGet = () => Promise<Todo[] | null>;
