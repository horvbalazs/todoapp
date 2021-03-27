import db from "../_helpers/db";
import { TodoData } from "../_types/todoData";
import { TodoResponse } from "../_types/todoResponse";
const Todo = db.Todo;

export default {
  create,
  getById,
  getByOwner,
  edit,
  delete: _delete,
};

async function create({ date, text }: TodoData, owner: string) {
  const todo = new Todo({ date, text, owner, done: false });
  await todo.save();

  return todo.toJSON();
}

async function getById(id: string) {
  return Todo.findById(id);
}

async function getByOwner(userId: string) {
  return Todo.find({ owner: userId });
}

async function edit({ date, text }: TodoResponse, id: string) {
  await Todo.findByIdAndUpdate(id, { date, text });
}

async function _delete(id: string) {
  await Todo.findByIdAndDelete(id);
}
