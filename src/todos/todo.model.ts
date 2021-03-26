import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface TodoDoc extends mongoose.Document {
  owner: string;
  text: string;
  date: number;
}

const schema = new Schema({
  owner: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Number, required: true },
  done: { type: Boolean, required: true },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret: TodoDoc) {
    delete ret._id;
    delete ret.owner;
  },
});

export default mongoose.model<TodoDoc>("Todo", schema);
