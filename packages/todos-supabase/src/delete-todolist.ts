import { SupabaseClient } from '@supabase/supabase-js';
import { SimpleRequestResponse } from '@workspace/core/request';

export const deleteTodolist = async (supabase: SupabaseClient, id: number): Promise<SimpleRequestResponse> => {
  // Start a transaction using RPC for atomicity
  const { error: rpcError } = await supabase.rpc('delete_todolist_with_todos', {
    todolist_id: id
  });

  // If RPC doesn't exist, fall back to manual deletion
  if (rpcError && rpcError.message.includes('does not exist')) {
    // First delete all todos that belong to this todolist
    const { error: todosError } = await supabase
      .from('todos')
      .delete()
      .eq('todolist_id', id);
    
    if (todosError) {
      console.error('Error deleting associated todos:', todosError);
      return {
        error: true,
        message: `Failed to delete associated todos: ${todosError.message}`,
      };
    }
    
    // Then delete the todolist itself
    const { error: todolistError } = await supabase
      .from('todolists')
      .delete()
      .eq('id', id);
    
    if (todolistError) {
      console.error('Error deleting todo list:', todolistError);
      return {
        error: true,
        message: todolistError.message,
      };
    }
    
    return {
      error: false,
      message: 'Todo list and its todos deleted successfully',
    };
  }
  
  if (rpcError) {
    console.error('Error deleting todo list with todos:', rpcError);
    return {
      error: true,
      message: rpcError.message,
    };
  }
  
  return {
    error: false,
    message: 'Todo list and its todos deleted successfully',
  };
};