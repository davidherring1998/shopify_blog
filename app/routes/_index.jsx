import { useLoaderData, Link } from "@remix-run/react";
import { db } from "../utils/db.server.ts";

export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  };
  return data;
};

export default function Home() {
  const { posts } = useLoaderData();
  return (
    <>
      <div class="hero-image outside--container">
        <div class="hero-text"></div>
      </div>
      <h1>Shopify Code Crafters: Unleashing Digital Creativity</h1>
      <p>
        Welcome to our Shopify Coding Blog - your ultimate source for mastering
        Shopify development. Dive into a world of detailed tutorials, insightful
        coding tips, and the latest best practices tailored specifically for
        Shopify. Whether you're a beginner eager to learn the basics or a
        seasoned developer seeking advanced techniques, our blog is designed to
        help you enhance your Shopify coding skills and create stunning,
        efficient online stores.
      </p>
      <div>
        <ul className="posts-list homepage--post--list">
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
      <Link to="/posts/index">
        <button className="btn btn-block homepage--btn">More</button>
      </Link>
    </>
  );
}
