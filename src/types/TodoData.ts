export interface TodoData {
  id: number;
  name: string;
  description: string;
  deadLine?: string;
  status?: string
}

export interface UpdateTodoData {
  name: string;
  description: string;
  deadLine?: string;
  status?: string
}