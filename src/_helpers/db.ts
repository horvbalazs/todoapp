import mongoose from "mongoose";
import User from "../users/user.model";
import Todo from "../todos/todo.model";
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.CONNECTION_STRING, connectionOptions);
mongoose.Promise = global.Promise;

export default {
  User,
  Todo,
};
