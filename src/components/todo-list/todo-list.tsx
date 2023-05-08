import React from "react";
import TodoCard from './todo-card';
import { TodoData } from '../../types/TodoData';

interface TodoListProps {
  todos: TodoData[];
  noDataPlaceHolder?: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, noDataPlaceHolder }) => {
  return (
    <div className="todo-list">
      {(todos && todos.length)
        ? todos.map((item: TodoData, idx: number) => <TodoCard key={idx}  data={item} />)
        : <p className="no-data-ph" data-testid="no-data-cont">{noDataPlaceHolder ? noDataPlaceHolder : 'No Data Found'}</p>}
    </div>
  );
};

export default TodoList;
