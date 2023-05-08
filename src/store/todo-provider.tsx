import { useReducer, useEffect } from "react";
import { TodoData } from "../types/TodoData";
import { TodoContext, todoReducer } from "./todo-context";

const TodoContextProvider = ({ children }: any) => {
  // Retrive Data from Local Storage
  const localData = localStorage.getItem("todoData");
  let parseLocal = localData ? JSON.parse(localData) : [];
  // Init stored on useReducer
  const [todoState, dispatch] = useReducer(todoReducer, [...parseLocal]);

  const addTodoItem = (todoData: TodoData) => {
    dispatch({
      type: "ADD",
      payload: todoData,
    });
  };

  const deleteTodoItem = (id: number) => {
    dispatch({
      type: "DELETE",
      payload: { id },
    });
  };

  const updateTodoItem = (id: number, todoData: TodoData) => {
    dispatch({
      type: "UPDATE",
      payload: { id, data: todoData },
    });
  };

  useEffect(() => {
    // Store todo data to local storage for each update
    localStorage.setItem("todoData", JSON.stringify(todoState));
  }, [todoState])

  const value = {
    todoList: todoState,
    addTodoItem: addTodoItem,
    deleteTodoItem: deleteTodoItem,
    updateTodoItem: updateTodoItem,
  };
  
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
