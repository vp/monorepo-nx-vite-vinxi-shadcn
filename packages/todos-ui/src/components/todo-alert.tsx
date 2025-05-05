export const TodoAlert = ({ message }: { message: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{message}</div>
  </div>
);
