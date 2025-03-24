import { Hono } from "hono";
import { signUpWithUsernameAndPassword } from "../controllers/authentication";
import { SignUpWithUsernameAndPasswordError } from "../controllers/authentication/+type";

export const hono = new Hono();

hono.get("/health", (context) => {
  return context.json(
    {
      message: "All Ok",
    },
    200
  );
});

hono.post("/authentications/sign-up", async (context) => {
    const {username, password} = await context.req.json();

    try{
        const result = await signUpWithUsernameAndPassword({username, password});
        return context.json({
            data: result,
        },
        201);


    }catch (e){
        if(e === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME){
            return context.json(
                {
                    message: "Username already exists",
                },
                409
            );
        }

        if(e === SignUpWithUsernameAndPasswordError.UNKNOWN){
            return context.json(
                {
                    message: "Unknown error",
                },
                500
            );
        }
            return context.json(
              {
                message: "Unknown error",
              },
              500
            );
    }
}
);