import { Link, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "../utils/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");

  const fields = { title, body };
  console.log(fields);

  const post = await db.post.create({ data: fields });

  return redirect(`/posts/${post.id}/`);
};

export default function NewPost() {
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
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" />
          </div>
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </Form>
      </div>
    </>
  );
}
