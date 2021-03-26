import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface UserDoc extends mongoose.Document {
  email: string;
  hash: string;
}

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret: UserDoc) {
    delete ret._id;
    delete ret.hash;
  },
});

export default mongoose.model<UserDoc>("User", schema);
