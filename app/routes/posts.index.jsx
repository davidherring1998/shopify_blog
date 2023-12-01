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
      <div className="page-header">
        <h1>Blogs</h1>
        {!user ? (
          ""
        ) : (
          <Link to="/posts/new" className="btn">
            Create
          </Link>
        )}
      </div>
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

      <footer>
        <div className="top-footer--container">
          <div className="footer-about">
            <a href="/" className="logo">
              SHOPIFY CRAFTERS
            </a>
            <p>
              We're a team of passionate Shopify enthusiasts dedicated to
              empowering online merchants with the latest trends, tips, and best
              practices in Shopify design and development.
            </p>
          </div>

          <div className="footer-quicklinks">
            <a href="/" className="logo">
              LINKS
            </a>
            <p>
              <Link to="/auth/signup">Signup</Link>
            </p>
            <p>
              <Link to="/auth/login">Login</Link>
            </p>
            <p>
              <Link to="/posts/index">Blogs</Link>
            </p>
            <p>
              <Link to="/">About</Link>
            </p>
          </div>

          <div className="footer-quicklinks--two">
            <a href="/" className="logo">
              SOCIAL
            </a>
            <p>
              <Link to="/auth/signup">Facebook</Link>
            </p>
            <p>
              <Link to="/auth/login">Instagram</Link>
            </p>
            <p>
              <Link to="/posts/index">Twitter</Link>
            </p>
            <p>
              <Link to="/">Youtube</Link>
            </p>
          </div>

          <div className="footer-contact">
            <a href="/" className="logo">
              CONTACT
            </a>
            <p>(615)-707-1267</p>
            <p>David.1998.Herrings@gmail.com</p>
            <p>318 Jays Circle Woodbury, TN</p>
            <p>www.UpsideMicrophones.com</p>
          </div>
        </div>

        <div className="bottom-footer--container">
          <p>&copy; 2023 Shopify Crafters </p>
        </div>
      </footer>
    </>
  );
}
