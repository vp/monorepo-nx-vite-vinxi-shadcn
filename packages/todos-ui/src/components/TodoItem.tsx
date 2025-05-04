import { Todo, TodoOnDelete, TodoOnUpdate } from '@workspace/todos-ui/types';
import { Button } from '@workspace/ui/components/ui/button';

export const TodoItem = ({
  todo,
  onDelete,
  onUpdate,
}: {
  todo: Todo;
  onDelete: TodoOnDelete;
  onUpdate: TodoOnUpdate;
}) => {
  const handleDelete = () => {
    onDelete({ id: todo.id });
  };

  const handleToggle = () => {
    onUpdate({ id: todo.id, is_complete: !todo.is_complete });
  };

  const { is_complete } = todo;

  return (
    <li className="w-full block cursor-pointer hover:bg-200 focus:outline-none focus:bg-200 transition duration-150 ease-in-out">
      <div className="flex items-center px-0 py-0 sm:px-6  gap-2">
        <div>
          <input
            className="cursor-pointer"
            onChange={(e) => handleToggle()}
            type="checkbox"
            checked={is_complete ? true : false}
          />
        </div>
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">
            {todo.task}
          </div>
        </div>

        <Button
          onClick={() => {
            handleDelete();
          }}
          size="sm"
          variant="ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </li>
  );
};
