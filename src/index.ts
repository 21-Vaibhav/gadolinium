import jwt from "jsonwebtoken";
import "dotenv/config";


const payload: jwt.JwtPayload = {
  iss: "https://purpleshorts.co.in",
  sub: "Vaibhav-G",
};

const jwtSecretKey = process.env.SECRET_KEY;

console.log(jwtSecretKey);

if (!jwtSecretKey) {
  throw new Error("undefined");
}

const token = jwt.sign(payload, jwtSecretKey, {
  algorithm: "HS256",
});


console.log(token);

try {
  const decodedPayload = jwt.verify(token, jwtSecretKey);
  console.log(decodedPayload);
}
catch (e) {
  console.log("error",e);
}

