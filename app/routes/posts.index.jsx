import { useLoaderData, Link } from "@remix-run/react";
import { db } from "../utils/db.server";
import { getUser } from "../utils/session.server";

// Getting post
export const loader = async ({ request }) => {
  const user = await getUser(request);

  const data = {
    posts: await db.post.findMany({
      orderBy: { createdAt: "desc" },
    }),
    user,
  };
  return data;
};

// Added conditions to control post view and create by non-members
export default function PostItems() {
  const { posts, user } = useLoaderData();
  return (
    <>
      {!user ? (
        <div className="page-header">
          <h1>Posts</h1>
        </div>
      ) : (
        <div className="page-header">
          <h1>Posts</h1>
          <Link to="/posts/new" className="btn">
            Create
          </Link>
        </div>
      )}

      <div>
        <ul className="posts-list indexpage-post--list homepage-post--list">
          {posts.map((post) => (
            <li key={post.id}>
              {!user ? (
                <>
                  <Link to={`/auth/login`}>
                    <h2>{post.title}</h2>
                  </Link>
                </>
              ) : (
                <Link to={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
              )}

              <p className="dates">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

              <p className="excerpt">{post.excerpt}</p>

              {!user ? (
                <>
                  <Link to={`/auth/login`}>
                    <p className="post-link">More...</p>
                  </Link>
                </>
              ) : (
                <Link to={`/posts/${post.id}`}>
                  <p className="post-link">More...</p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
