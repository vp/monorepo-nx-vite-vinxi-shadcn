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

export type TodoOnDelete = (id: number) => Promise<{ error: boolean; message: string }>;
export type TodoOnUpdate = (todo: TodoToUpdate) => Promise<{ error: boolean; message: string; data?: Todo }>;
export type TodoOnAdd = (todo: TodoToAdd) => Promise<{ error: boolean; message: string; data?: Todo }>;
export type TodoOnGet = () => Promise<Todo[] | null>;