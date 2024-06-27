import { ITodo } from "../lib/types";
import { useContext } from "react";
import { TodoContext } from "../lib/context";
import { ActionTypes } from "../lib/types";
import { remove, update } from "../lib/api";

interface Props {
  todo: ITodo;
}

export const ToDoItem: React.FC<Props> = ({ todo }) => {
  const context = useContext(TodoContext);
  if (!context) throw new Error();

  const { dispatch } = context;

  const handleRemove = () => {
    remove(todo.id).then(() => {
      dispatch({ type: ActionTypes.removeTodo, payload: todo.id });
    });
  };

  const handleToggle = () => {
    update(todo.id, !todo.completed).then((updatedTodo) => {
      dispatch({ type: ActionTypes.updateTodo, payload: updatedTodo });
    });
  };

  return (
    <div className={`item ${todo.completed ? "completed" : ""}`}>
      <p>{todo.text}</p>
      <div>
        <button onClick={handleToggle}>√</button>
        <button onClick={handleRemove}>X</button>
      </div>
    </div>
  );
};
