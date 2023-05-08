import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TodoMain from "../todo-main";

describe("ToDo Main Component Render Test", () => {
    it("renders todo main page with expected column labels", () => {
        render(
          <BrowserRouter>
            <TodoMain />
          </BrowserRouter>
        );
      
        const columHead1 = screen.getByRole("heading", {
            name: /ToDo/i
        });
        const columHead2 = screen.getByRole("heading", {
            name: /In Progress/i
        });
        const columHead3 = screen.getByRole("heading", {
            name: /Done/i
        });
      
        expect(columHead1).toBeInTheDocument();
        expect(columHead2).toBeInTheDocument();
        expect(columHead3).toBeInTheDocument();
      });
      
      it("should have button to create todo item", () => {
          render(
              <BrowserRouter>
                <TodoMain />
              </BrowserRouter>
            );
      
          const creatTaskBtn = screen.getByRole('button');
      
          expect(creatTaskBtn).toHaveTextContent(/Create Task/i);
      })
})


