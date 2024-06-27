import React, { useContext, useState } from "react";
import { add } from "../lib/api";
import { TodoContext } from "../lib/context";
import { ActionTypes } from "../lib/types";


export const AddToDo: React.FC = () => {

  const [text, setText] = useState<string>("");
  const context = useContext(TodoContext);
  if(!context) throw new Error()
  const { dispatch } = context;

  if (!context) {
    throw new Error("context is not defined");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add({ text, completed: false })
    .then((res) => {
      dispatch({ type: ActionTypes.addTodo, payload: res });
      setText("");
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Save</button>
      </form>
    </div>
  );
};
