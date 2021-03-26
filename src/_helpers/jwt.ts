import expressJwt from "express-jwt";
import { secret } from "../../config.json";
import userService from "../users/user.service";

export default jwt;

function jwt() {
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: ["/users/authenticate", "/users/register"],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
