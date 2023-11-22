import { useActionData, Form, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { login, createUserSession } from "../utils/session.server";

// Error handling
function validateUsername(username) {
  if (typeof username !== "string" || username.length < 3) {
    return "Username must be at least 3 characters long";
  }
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 5) {
    return "Password must be at least 5 characters long";
  }
}

function badRequest(data) {
  return json(data, { status: 400 });
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  const fields = { username, password };

  // Validation
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const user = await login({ username, password });
  if (!user) {
    return badRequest({
      fields,
      fieldErrors: { username: "Invalid Credentials" },
    });
  }

  return createUserSession(user.id, "/posts/index ");
};

export default function Logins() {
  const actionData = useActionData();

  return (
    <div className="auth-container">
      <div className="page-header">
        <h1>Login</h1>
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
          </div>
        </Form>
        <div className="signup-form">
          <Link to="/auth/signup">
            <p className="signup-link--header">Don't have an account? </p>
            <p className="signup-link"> Sign Up </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
