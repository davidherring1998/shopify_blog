import { Link, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");

  const field = { title, body };
  console.log(field);

  // @todo - submit to database...

  return redirect("/posts/index");
};

export default function NewPost() {
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <button className="btn btn-reverse">Back</button>
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

// create page-content
// create form input -> textarea -> button btn btn-block
