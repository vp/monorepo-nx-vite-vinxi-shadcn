-- Create a function to delete todolist with associated todos in a transaction
CREATE OR REPLACE FUNCTION delete_todolist_with_todos(todolist_id bigint)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete associated todos first
  DELETE FROM todos WHERE todolist_id = $1;
  
  -- Then delete the todolist
  DELETE FROM todolists WHERE id = $1;
  
  RETURN json_build_object('success', true);
EXCEPTION 
  WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;