import { RequestResponse, SimpleRequestResponse } from "@workspace/core/request";

export type Todo = {
  id: number;
  inserted_at: string;
  is_complete: boolean | null;
  task: string | null;
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

export type TodoOnDelete = (args: {
  id: number;
}) =>  Promise<SimpleRequestResponse>;

export type TodoOnUpdate = (
  todo: TodoToUpdate
) => Promise<RequestResponse<Todo>>;

export type TodoOnAdd = (
  todo: TodoToAdd
) => Promise<RequestResponse<Todo>>;

export type TodoOnGet = () => Promise<Todo[] | null>;

export type TodolistToAdd = {
  title: string;
  description?: string;
};

export type Todolist = {
  id: number;
  inserted_at: string;
  title: string;
  description?: string | null;
};

export type TodolistOnAdd = (
  todolist: TodolistToAdd
) =>  Promise<RequestResponse<Todolist>>;
