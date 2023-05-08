import React from "react";
import { Routes, Route } from "react-router-dom";
import { TodoMain, TodoDetailView } from "./pages";
import TodoContextProvider from "./store/todo-provider";


const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <TodoContextProvider>
        <Routes>
          <Route path="/" element={<TodoMain />} />
          <Route path="detail" element={<TodoDetailView />} />
          <Route path="/detail/:todoId" element={<TodoDetailView />} />
        </Routes>
      </TodoContextProvider>
    </div>
  );
};

export default App;
