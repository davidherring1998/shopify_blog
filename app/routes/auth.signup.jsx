import { useActionData, Form, Link } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { db } from "../utils/db.server";
import { register, createUserSession } from "../utils/session.server";

// Error handling
function validateUsername(username) {
  if (typeof username !== "string" || username.length < 3) {
    return "Username must be atleast 3 characters long";
  }
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 5) {
    return "Password must be atleast 5 characters long";
  }
}

function badRequest(data) {
  return json(data, { status: 400 });
}

export const action = async ({ request }) => {
  // Deconstruct
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  const fields = {
    username,
    password,
  };

  // Validation
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fields, fieldErrors });
  }

  const existingUser = await db.user.findFirst({
    where: {
      username,
    },
  });

  if (existingUser) {
    return badRequest({
      fields,
      fieldErrors: { username: ` ${username} already exist` },
    });
  }

  const newUser = await register({ username, password });
  if (!newUser) {
    return badRequest({
      fields,
      fieldErrors: "Something went wrong",
    });
  } else {
    console.log(newUser.username);
  }

  return createUserSession(newUser.id, "/posts/index");
};

export default function Signup() {
  const actionData = useActionData();

  return (
    <div className="auth-container">
      <div className="page-header">
        <h1>Sign Up</h1>
      </div>

      <div className="page-content">
        <Form method="POST">
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
        </Form>
        <div className="signup-form">
          <Link to="/auth/login">
            <p className="signup-link--header">Already have an account? </p>
            <p className="signup-link"> Sign In </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
