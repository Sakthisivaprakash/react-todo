import { createContext } from "react";
import { TodoData, UpdateTodoData } from "../types/TodoData";

interface TodoContextData {
  todoList: TodoData[];
  addTodoItem(data: TodoData): void;
  deleteTodoItem(id: number): void;
  updateTodoItem(id: number, data: UpdateTodoData): void;
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
      try {
        const updatableIndex = state.findIndex(
          (todo: any) => todo.id === action.payload.id
        );

        if(updatableIndex !== -1) {
          const updatableTodo = state[updatableIndex];
          const updatedItem = {...updatableTodo, ...action.payload.data};
          const updatedTodo = [...state];
          updatedTodo[updatableIndex] = updatedItem;
          //   console.log(updatedTodo, 'updatedTodo');
          return updatedTodo;
        } else {
          throw Error('data not found');
        }       
      } catch(err) {
        throw Error('data not found')
      }
    case "DELETE":
      return state.filter((todo: any) => todo.id !== action.payload.id);
    default:
      return state;
  }
};


