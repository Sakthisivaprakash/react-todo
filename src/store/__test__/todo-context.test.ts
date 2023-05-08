import { todoReducer } from '../todo-context';
import { TodoData } from "../../types/TodoData";

it("should insert the new object into the array", () => {
    const action = {
        type: 'ADD',
        payload: {
            id: 956,
            name: '',
            description: '',
            deadLine: '',
            status: '',
        }
    };
    const state: TodoData[] = [];

    const result = todoReducer(state, action);

    // expect(result).toBe();
});

