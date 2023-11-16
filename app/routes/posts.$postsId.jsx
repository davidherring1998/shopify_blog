import { useLoaderData, Link } from "@remix-run/react";
import { db } from "../utils/db.server";
import { redirect } from "@remix-run/node";

// Retrieving specific post from database
export const loader = async ({ params }, LoaderFunctionArgs) => {
  const post = await db.post.findUnique({
    where: { id: params.postsId },
  });

  if (!post) throw new Error("Post not found");

  const data = { post };
  return data;
};

// Deleting specific post inside database
export const action = async ({ request, params }, LoaderFunctionArgs) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const post = await db.post.findUnique({
      where: { id: params.postsId },
    });

    if (!post) throw new Error("Post not found");

    await db.post.delete({ where: { id: params.postsId } });
    return redirect("/posts/index");
  }
};

export default function Post() {
  const { post } = useLoaderData();
  return (
    <div>
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to={"/posts/index"} className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <p className="dates">{new Date(post.createdAt).toLocaleDateString()}</p>
        <p>{post.body}</p>
      </div>
      <div className="page-footer">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-block " type="submit">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
