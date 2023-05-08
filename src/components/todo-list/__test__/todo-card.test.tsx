import { render, screen, fireEvent, waitFor  } from "@testing-library/react";
import TodoCard from "../todo-card";
import { BrowserRouter } from "react-router-dom";
import { TodoData } from "../../../types/TodoData";

describe("ToDo Card Component", () => {
    it("should show edit button on mouse over the todo card", async () => {
        const data: TodoData = {
            id: 2,
            name: 'Rajni',
            description: 'Frontend Integration',
            deadLine: "2023-05-11"
        };

        render(
            <BrowserRouter>
                <TodoCard data={data}  />
            </BrowserRouter>            
        )

        fireEvent.mouseOver(screen.getByText('Rajni'));
        const editButton = await waitFor(() => screen.findByTestId('edit-button'));

        expect(editButton).toBeInTheDocument();
    })
})