import jwt from "jsonwebtoken";
import "dotenv/config";


const payload: jwt.JwtPayload = {
  iss: "https://purpleshorts.co.in",
  sub: "Vaibhav-G",
};

const secretKey = process.env.SECRET_KEY;

console.log(secretKey);

if (!secretKey) {
  throw new Error("undefined");
}

const token = jwt.sign(payload, secretKey, {
  algorithm: "HS256",
});


console.log(token);

try {
  const decodedPayload = jwt.verify(token, secretKey);
  console.log(decodedPayload);
}
catch (e) {
  console.log("error",e);
}

