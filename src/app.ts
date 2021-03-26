import express from "express";
import bp from "body-parser";
import jwt from "./_helpers/jwt";
import errorHandler from "./_helpers/error-handler";
import users from "./users/users.controller";
import todos from "./todos/todos.controller";

const app = express();
const port = process.env.NODE_ENV === "prod" ? process.env.PORT || 80 : 4000;

app.use(jwt());

app.use(bp.json());

app.use("/users", users);
app.use("/todos", todos);

app.use(errorHandler);

app.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`server is listening on ${port}`);
});
