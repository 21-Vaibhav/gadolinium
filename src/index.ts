import jwt from "jsonwebtoken";

const payload: jwt.JwtPayload = {
  iss: "https://purpleshorts.co.in",
  sub: "Vaibhav-G",
};

const secretKey = "HelloWorld";

const token = jwt.sign(payload, secretKey, {
  algorithm: "HS256",
  expiresIn: "1h",
});


console.log(token);

const decodedPayload = jwt.decode(token);

console.log(decodedPayload);
