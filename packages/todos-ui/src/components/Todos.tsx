import { TodoAddForm } from '@workspace/todos-ui/components/TodoAddForm';
import { TodoList } from '@workspace/todos-ui/components/TodoList';
import {
  Todo,
  TodoOnAdd,
  TodoOnDelete,
  TodoOnUpdate,
  TodoToAdd,
  TodoToUpdate,
} from '@workspace/todos-ui/types';
import { Spinner } from '@workspace/ui/components/ui/spinner';
import { useEffect, useReducer } from 'react';
import { Alert, AlertTitle } from '@workspace/ui/components/ui/alert';

export type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  operation: 'idle' | 'fetch' | 'create' | 'update' | 'delete';
};

export type TodosAction =
  | {
      type: 'OPERATION_START';
      payload: { operation: 'fetch' | 'create' | 'update' | 'delete' };
    }
  | { type: 'FETCH_SUCCESS'; payload: Todo[] }
  | { type: 'CREATE_SUCCESS'; payload: Todo }
  | { type: 'UPDATE_SUCCESS'; payload: Todo }
  | { type: 'DELETE_SUCCESS'; payload: { id: number } }
  | { type: 'OPERATION_ERROR'; payload: string }
  | { type: 'RESET_SUCCESS' };

export const initialTodosState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  successMessage: null,
  operation: 'idle',
};

export function todosReducer(
  state: TodosState,
  action: TodosAction
): TodosState {
  switch (action.type) {
    case 'OPERATION_START':
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
        operation: action.payload.operation,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        todos: action.payload,
        loading: false,
        operation: 'idle',
      };

    case 'CREATE_SUCCESS':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
        successMessage: 'Todo added successfully!',
        operation: 'idle',
      };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        loading: false,
        successMessage: 'Todo updated successfully!',
        operation: 'idle',
      };

    case 'DELETE_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        loading: false,
        successMessage: 'Todo removed successfully!',
        operation: 'idle',
      };

    case 'OPERATION_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: 'idle',
      };

    case 'RESET_SUCCESS':
      return {
        ...state,
        successMessage: null,
      };

    default:
      return state;
  }
}

export const Todos = ({
  todos: initialTodos,
  onDelete,
  onUpdate,
  onAdd,
}: {
  todos: Todo[];
  onDelete: TodoOnDelete;
  onUpdate: TodoOnUpdate;
  onAdd: TodoOnAdd;
}) => {
  const [state, dispatch] = useReducer(todosReducer, {
    ...initialTodosState,
    todos: initialTodos,
  });

  useEffect(() => {
    // Reset success message after 3 seconds
    if (state.successMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'RESET_SUCCESS' });
      }, 3000);
      return () => clearTimeout(timer);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [state.successMessage]);

  const handleAddTodo = async (todo: TodoToAdd) => {
    dispatch({ type: 'OPERATION_START', payload: { operation: 'create' } });

    const newTodo = await onAdd(todo);
    if (!newTodo.error) {
      dispatch({ type: 'CREATE_SUCCESS', payload: newTodo.data });
    } else {
      dispatch({
        type: 'OPERATION_ERROR',
        payload: newTodo.message,
      });
    }
  };

  const handleUpdateTodo = async (todo: TodoToUpdate) => {
    dispatch({ type: 'OPERATION_START', payload: { operation: 'update' } });

    const updatedTodo = await onUpdate(todo);

    if (!updatedTodo.error) {
      dispatch({ type: 'UPDATE_SUCCESS', payload: updatedTodo.data });
    } else {
      dispatch({
        type: 'OPERATION_ERROR',
        payload: updatedTodo.message,
      });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    dispatch({ type: 'OPERATION_START', payload: { operation: 'delete' } });

    const deteletionResult = await onDelete(id);
    if (!deteletionResult.error) {
      dispatch({ type: 'DELETE_SUCCESS', payload: { id } });
    } else {
      dispatch({
        type: 'OPERATION_ERROR',
        payload: deteletionResult.message,
      });
    }
  };

  // Determine if specific operations are loading
  // const isCreating = state.loading && state.operation === 'create';
  // const isUpdating = state.loading && state.operation === 'update';
  // const isDeleting = state.loading && state.operation === 'delete';
  const isFetching = state.loading && state.operation === 'fetch';

  return isFetching ? <Spinner /> : (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>
      <TodoAddForm onSubmit={handleAddTodo} />
      
      {state.error && <Alert variant='destructive'><AlertTitle>{state.error}</AlertTitle></Alert>}
      {state.successMessage && <Alert><AlertTitle>{state.successMessage}</AlertTitle></Alert>}
      
      <TodoList
        todos={state.todos}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
};
