import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TodoList from '../todo-list';
import { TodoData } from "../../../types/TodoData";

describe("ToDo List Component Test", () => {
    it("should render list of object passed in to the list component", async () => {
        // Arrange
        const data: TodoData[] = [
            {
              id: 1,
              name: 'Sakthi',
              description: 'UI development',
              deadLine: "2023-05-09"
            },
            {
              id: 2,
              name: 'Rajni',
              description: 'Frontend Integration',
              deadLine: "2023-05-11"
            },
         ]

        // Act 
        render(
            <BrowserRouter>
                <TodoList todos={data} />
            </BrowserRouter>            
        )

        const divElements = screen.getAllByTestId("todo-container");

        // Assert
        expect(divElements.length).toBe(2);
    })

    it("Should display no data Placeholder if data not available", () => {
        // Arrange
        const data: TodoData[] = [];

        // Act 
        render(
            <BrowserRouter>
                <TodoList todos={data} />
            </BrowserRouter>            
        )

        const noDataLabel = screen.getByTestId("no-data-cont");

        expect(noDataLabel).toHaveTextContent(/No Data Found/i)
    })
})
