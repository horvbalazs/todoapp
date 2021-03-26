import express from "express";
import todoService from "./todo.service";

const router = express.Router();
router.post("/", create);
router.get("/", create);
router.put("/:id", edit);
router.delete("/:id", _delete);

export default router;

function create(req, res, next) {
  todoService
    .create(req.body, req.user.sub)
    .then((todo) => res.json(todo))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  todoService
    .getByOwner(req.user.sub)
    .then((todos) => res.json(todos))
    .catch((err) => next(err));
}

async function edit(req, res, next) {
  if (await validate(req.params.id, req.user.sub)) {
    todoService
      .edit(req.body, req.params.id)
      .then(() => res.json({}))
      .catch((err) => next(err));
  }
}

async function _delete(req, res, next) {
  if (await validate(req.params.id, req.user.sub)) {
    todoService
      .delete(req.params.id)
      .then(() => res.json({}))
      .catch((err) => next(err));
  }
}

async function validate(id, userId) {
  const todo = await todoService.getById(id);
  return todo.owner === userId;
}
