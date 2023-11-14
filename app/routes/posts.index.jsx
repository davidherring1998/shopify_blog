import { useLoaderData, Link } from "@remix-run/react";
import { db } from "../utils/db.server";


export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      orderBy: { createdAt: "desc" },
    }),
  };
  return data;
};


export default function PostItems() {
  const { posts } = useLoaderData();
  return (
    <>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          Create
        </Link>
      </div>
      <div>
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p className="dates">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
