import { useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { db } from "../utils/db.server";

function validateUsername(username) {
  if (typeof username !== "string" || username.length < 8) {
    return "Username should be at least 8 characters long";
  }
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    return "Password should be at least 8 characters long";
  }
}

function badRequest(data) {
  return json(data, { status: 400 });
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");

  const fields = { loginType, username, password };

  console.log(fields);

  // Validation
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return badRequest({ fieldErrors, fields });
  }
};

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="auth-container">
      <div className="page-header">
        <h1>Login</h1>
      </div>

      <div className="page-content">
        <form action="POST">
          <fieldset>
            <legend>Login or Register</legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />
              Login
            </label>
            <label>
              <input type="radio" name="loginType" value="register" /> Register
            </label>
          </fieldset>

          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            <div className="error">
              {actionData?.fieldErrors?.username &&
                actionData?.fieldErrors?.username}
            </div>
          </div>
          <div className="form-control">
            {" "}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <div className="error">
              {actionData?.fieldErrors?.username &&
                actionData?.fieldErrors?.username}
            </div>
          </div>

          <div className="btn btn-block" type="submit">
            Submit
          </div>
        </form>
      </div>
    </div>
  );
}
