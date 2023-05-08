import { createContext } from "react";
import { TodoData, UpdateTodoData } from "../types/TodoData";

interface TodoContextData {
  todoList: TodoData[];
  addTodoItem(data: TodoData): any;
  deleteTodoItem(id: number): any;
  updateTodoItem(id: number, data: UpdateTodoData): any;
}

export const TodoContext = createContext<TodoContextData>({
  todoList: [],
  addTodoItem: (todoData) => {},
  deleteTodoItem: (id) => {},
  updateTodoItem: (id, todoData) => {},
});

export const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updatableIndex = state.findIndex(
        (todo: any) => todo.id === action.payload.id
      );
      const updatableTodo = state[updatableIndex];
      const updatedItem = {...updatableTodo, ...action.payload.data};
      const updatedTodo = [...state];
      updatedTodo[updatableIndex] = updatedItem;
    //   console.log(updatedTodo, 'updatedTodo');
      return updatedTodo;
    case "DELETE":
      return state.filter((todo: any) => todo.id !== action.payload.id);
    default:
      return state;
  }
};


