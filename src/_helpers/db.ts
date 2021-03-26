import mongoose from "mongoose";
import { connectionString } from "../../config.json";
import User from "../users/user.model";
import Todo from "../todos/todo.model";
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(connectionString, connectionOptions);
mongoose.Promise = global.Promise;

export default {
  User,
  Todo,
};
