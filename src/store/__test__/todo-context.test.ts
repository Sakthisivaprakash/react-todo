import { todoReducer } from '../todo-context';
import { TodoData } from "../../types/TodoData";

describe("todoReducer()", () => {
    it("should insert the new object into the array", () => {
        const action = {
            type: 'ADD',
            payload: {
                id: 956,
                name: 'test',
                description: 'test',
                deadLine: '2023-05-10',
                status: 'INPROGRESS',
            }
        };

        const state: TodoData[] = [];
    
        const result = todoReducer(state, action);
    
        expect(result.length).toBe(1);
    });   
    
    it("should delete the item from the list", () => {
        const action = {
            type: 'DELETE',
            payload: {
                id: 956
            }
        };
        
        const state: TodoData[] = [
            {
                id: 956,
                name: 'test',
                description: 'test',
                deadLine: '2023-05-10',
                status: 'INPROGRESS',
            }
        ];

        const result = todoReducer(state, action);

        expect(result.length).toBe(0);
    });

    it("should update particular item found in the list", () => {
        const action = {
            type: 'UPDATE',
            payload: {
                id: 956,
                data : {
                    name: 'test2',
                    description: 'test',
                    deadLine: '2023-05-10',
                    status: 'INPROGRESS',
                }               
            }
        };

        const state: TodoData[] = [
            {
                id: 956,
                name: 'test',
                description: 'test',
                deadLine: '2023-05-10',
                status: 'INPROGRESS',
            }
        ];

        const result = todoReducer(state, action);

        expect(result[0].name).toMatch('test2');

    });

    it("should throw error if item not found in the list", () => {
        const action = {
            type: 'UPDATE',
            payload: {
                id: 100,
                data : {
                    name: 'test2',
                    description: 'test',
                    deadLine: '2023-05-10',
                    status: 'INPROGRESS',
                }               
            }
        };

        const state: TodoData[] = [
            {
                id: 956,
                name: 'test',
                description: 'test',
                deadLine: '2023-05-10',
                status: 'INPROGRESS',
            }
        ];

        const result = () => todoReducer(state, action);

        expect(result).toThrowError();
    })
})
