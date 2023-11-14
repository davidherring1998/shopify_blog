import { useLoaderData, Link } from "@remix-run/react";
import { db } from "../utils/db.server.ts";
import { SiRemix } from "react-icons/si/index.js";
import { FaShopify, FaUserFriends } from "react-icons/fa/index.js";
import { IoNewspaperOutline } from "react-icons/io5/index.js";
import image from "../../public/webstack-hero.jpg";

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
      <div className="top--container">
        {/* image */}
        <div className="hero--image"></div>
        {/* image text */}
        <h1>Shopify Code Crafters: Unleashing Digital Creativity</h1>
        <p>
          Welcome to our Shopify Coding Blog - your ultimate source for
          mastering Shopify development. Dive into a world of detailed
          tutorials, insightful coding tips, and the latest best practices
          tailored specifically for Shopify.
        </p>
        {/* button */}
        <Link to="/posts/index">
          <button className="hero-image--btn btn">Blogs</button>
        </Link>
        {/* top-box a */}
        <div className="top-box top-box--a">
          <h4> Welcome</h4>
          <p className="price">Join Today! </p>
          <Link to="/posts/index">
            <button className="hero-image--btn btn">Sign Up</button>
          </Link>
          {/* top-box b */}
          <div className="top-box top-box--b">
            <h4>Welcome</h4>
            <p className="price">Join Today! </p>
            <Link to="/posts/index">
              <button className="hero-image--btn btn">Sign Up</button>
            </Link>
          </div>
        </div>
        {/* boxes */}
        <section className="boxes">
          <div className="box">
            <SiRemix size={50} />
            <h3>Remix</h3>
            <p>
              Covering everything Remix, the modern web SSR framework built on
              React.
            </p>
          </div>
          <div className="box">
            <FaShopify size={50} />
            <h3>Liquids</h3>
            <p>
              All about Liquids, Shopify's templating language used for creating
              dynamic storefronts!
            </p>
          </div>
          <div className="box">
            <FaUserFriends size={50} />
            <h3>Shopify Partners</h3>
            <p>
              Information about Shopify Partners, the program for building and
              monetizing with Shopify.
            </p>
          </div>
          <div className="box">
            <IoNewspaperOutline size={50} />
            <h3>Shopify News</h3>
            <p>
              Shopify Latest News: Updates on features, trends, and e-commerce
              insights.
            </p>
          </div>
        </section>
        {/* Information Section */}
        <section className="information--section">
          <img src={image} alt="" />
          <div>
            <h2>About Us</h2>
            <p>
              Welcome to Shopify Code Crafters, your premier destination for all
              things Shopify development. We are dedicated to unleashing digital
              creativity in the e-commerce space. Our blog serves as an ultimate
              resource, guiding both novice and experienced developers through
              the intricacies of Shopify's platform.
            </p>
          </div>
        </section>
      </div>

      <ul className="posts-list homepage-post--list">
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
      <Link to="/posts/index">
        <button className="btn btn-block homepage--btn">More</button>
      </Link>
    </>
  );
}
