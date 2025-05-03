export type Todo = {
  id: number;
  inserted_at: string;
  is_complete: boolean | null;
  task: string | null;
};

export type TodoToAdd = {
  is_complete?: boolean | null;
  task?: string | null;
};

export type TodoToUpdate = {
  id: number;
  is_complete?: boolean | null;
  task?: string | null;
};

export type TodoActionSuccess = { error: false; message?: string; data: Todo };
export type TodoActionError = { error: true; message: string; data: undefined };


export type TodoOnDelete = (
  id: number
) => Promise<{ error: false; message?: string } | { error: true; message: string }>;

export type TodoOnUpdate = (
  todo: TodoToUpdate
) => Promise<
| TodoActionSuccess
| TodoActionError
>;

export type TodoOnAdd = (
  todo: TodoToAdd
) => Promise<
  | TodoActionSuccess
  | TodoActionError
>;

export type TodoOnGet = () => Promise<Todo[] | null>;
