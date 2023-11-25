import { Link, Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { db } from "../utils/db.server";
import { getUser } from "../utils/session.server";

function validateTitle(title) {
  if (typeof title !== "string" || title.length < 3) {
    return "Title should be at least 3 characters long";
  }
}

function validateBody(body) {
  if (typeof body !== "string" || body.length < 10) {
    return "Body should be at least 10 characters long";
  }
}

function validateExcerpt(excerpt) {
  if (typeof excerpt !== "string" || excerpt.length < 60) {
    return `Excerpt should be at least 60 characters long. Your inputed length is ${excerpt.length}.`;
  } else if (excerpt.length > 70) {
    return `Excerpt should not be longer that 70 characters long. Your inputed length is ${excerpt.length}.`;
  }
}

function badRequest(data) {
  return json(data, { status: 400 });
}

// Submiting new post to database
export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const excerpt = form.get("excerpt");
  const user = await getUser(request);

  const fields = { title, body, excerpt };

  // Validation
  const fieldErrors = {
    title: validateTitle(title),
    body: validateBody(body),
    excerpt: validateExcerpt(excerpt),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields }, { status: 400 });
  }

  const post = await db.post.create({ data: { ...fields, userId: user.id } });

  return redirect(`/posts/${post.id}/`);
};

export default function NewPost() {
  const actionData = useActionData();

  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to={"/posts/index"} className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <Form method="POST">
          {/* <input type="image" name="image" alt="Remix Icon" src={<SiRemix />} /> */}

          <div className="form-control title-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={actionData?.fields?.title}
            />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.title
                  ? actionData?.fieldErrors?.title
                  : null}
              </p>
            </div>
          </div>

          <div className="form-control body-control">
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              id="body"
              defaultValue={actionData?.fields?.body}
            />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.body
                  ? actionData?.fieldErrors?.body
                  : null}
              </p>
            </div>
          </div>

          <div className="form-control excerpt-control">
            <label htmlFor="excerpt">Excrept</label>
            <textarea
              name="excerpt"
              id="excerpt"
              defaultValue={actionData?.fields?.excerpt}
            />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.excerpt
                  ? actionData?.fieldErrors?.excerpt
                  : null}
              </p>
            </div>
          </div>

          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}

// Add 4 images to choose from
// Add 4 colors to make image Icon
// POST image choice to database
