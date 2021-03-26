import { TodoData } from "./todoData";

export interface TodoResponse extends TodoData {
  owner: string;
  id: string;
}
