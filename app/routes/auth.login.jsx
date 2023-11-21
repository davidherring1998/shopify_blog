import { useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { db } from "../utils/db.server";

// Validation
function validateUsername(username) {
  if (typeof username !== "string" || username.length < 3) {
    return "Username should be at least 3 characters long";
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
  // Deconstruct data from the form
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");

  const fields = { loginType, username, password };

  // Validation
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  switch (loginType) {
    case "login": {
      // Find user
      // Check user
      // Create user session
    }
    case "register": {
      // Check for user
      // Create user
      // Create user session
    }
    default: {
      return badRequest({
        fields,
        formError: "Login type is not valid",
      });
    }
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
        <form method="POST">
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
              <input
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={actionData?.fields?.loginType === "register"}
              />
              Register
            </label>
          </fieldset>

          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={actionData?.fields?.username}
            />

            <div className="error">
              {actionData?.fieldErrors?.username ? (
                <p className="form-validation-error" id="username-error">
                  {actionData.fieldErrors.username}
                </p>
              ) : null}
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={actionData?.fields?.password}
            />

            <div className="error">
              {actionData?.fieldErrors?.password ? (
                <p className="form-validation-error" id="password-error">
                  {actionData.fieldErrors.password}
                </p>
              ) : null}
            </div>
          </div>

          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
