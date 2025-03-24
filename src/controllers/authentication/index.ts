import type { User } from "@prisma/client";
import { createHash } from "crypto";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { jwtSecretKey } from "../../../environment";

import {
  SignUpWithUsernameAndPasswordError,
  type SignUpWithUsernameAndPasswordResult,
} from "./+type";
import { prismaClient } from "../../../extras/prisma";

export const signUpWithUsernameAndPassword = async (parameters: {
  username: string;
  password: string;
}): Promise<SignUpWithUsernameAndPasswordResult> => {
  try {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        username: parameters.username,
      },
    });

    if (existingUser) {
      throw SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME;
    }

    const passwordHash = createHash("sha256")
      .update(parameters.password)
      .digest("hex");

    const user = await prismaClient.user.create({
      data: {
        username: parameters.username,
        password: passwordHash,
      },
    });

    // Generate token
    const jwtPayload: JwtPayload = {
      iss: "https://purpleshorts.co.in",
      sub: user.id,
      username: user.username,
    };

    const token = jwt.sign(jwtPayload, String(jwtSecretKey), {
      expiresIn: "30d",
    });

    return { token, user };
  } catch (e) {
    console.error("Error in signUpWithUsernameAndPassword:", e);
    throw SignUpWithUsernameAndPasswordError.UNKNOWN;
  }
};
