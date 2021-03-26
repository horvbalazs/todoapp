import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../_helpers/db";
import AuthData from "../_types/authData";
const User = db.User;

export default {
  authenticate,
  create,
  getById,
};

async function authenticate({ email, password }: AuthData) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function create({ email, password }: AuthData) {
  if (!validateEmail(email)) {
    throw "Invalid email";
  }

  if (await User.findOne({ email })) {
    throw "Unknown error";
  }

  const user = new User({ email });
  user.hash = bcrypt.hashSync(password, 10);

  await user.save();
}

async function getById(id: string) {
  return User.findById(id);
}

function validateEmail(email): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
