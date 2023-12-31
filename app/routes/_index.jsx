import { useLoaderData, Link } from "@remix-run/react";
import { db } from "../utils/db.server.ts";
import { FaShopify, FaUserFriends } from "react-icons/fa/index.js";
import { IoNewspaperOutline } from "react-icons/io5/index.js";
import { SiRemix } from "react-icons/si/index.js";
import image from "../../public/webstack-hero.jpg";
import { getUser } from "../utils/session.server";

// Getting post from database
export const loader = async ({ request }) => {
  const user = await getUser(request);
  const data = {
    posts: await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    user,
  };

  if (!data) {
    throw new Error();
  }
  return data;
};

export default function Home() {
  const { posts, user } = useLoaderData();
  return (
    <>
      <div className="wrapper">
        <section className="top-container">
          <header className="showcase">
            <h1>Shopify Crafters Coding Blog</h1>
            <p>
              Welcome to our Shopify Coding Blog - your ultimate source for
              mastering Shopify development. Dive into a world of detailed
              tutorials, insightful coding tips, and the latest best practices
              tailored specifically for Shopify.
            </p>
            <Link to="/posts/index">
              <button className="hero-image--btn btn">Blogs</button>
            </Link>
          </header>

          <div className="top-box top-box--a">
            <h4> Welcome</h4>
            <p className="catch">Join Today! </p>
            <Link to="/auth/signup">
              <button className=" btn btn-block">Sign Up</button>
            </Link>
          </div>

          <div className="top-box top-box--b">
            <h4>Shopify Crafters</h4>
            <p className="catch">Learn More! </p>
            <a href="#about">
              <button className="btn btn-block">About Us</button>{" "}
            </a>
          </div>
        </section>

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

        <section className="information-section" id="about">
          <img
            src={image}
            alt="About us banner showing the language stack of Shopify."
          />
          <div>
            <h2>About Us</h2>
            <p>
              Welcome to Shopify Code Crafters, your premier destination for all
              things Shopify development. We are dedicated to unleashing digital
              creativity in the e-commerce space. Our blog serves as an ultimate
              resource, guiding both novice and experienced developers through
              the intricacies of Shopify's platform.
            </p>
            <p>
              Here, you'll find an array of detailed tutorials, insightful
              coding tips, and up-to-date best practices, each crafted to
              enhance your Shopify development skills. Explore new app
              development opportunities, or stay abreast of the latest trends
              and features in the Shopify ecosystem, our blog is tailored to
              suit your needs.
            </p>
            <Link to="/auth/signup">
              <button className="btn btn-block">Sign Up</button>
            </Link>
          </div>
        </section>

        <ul className="posts-list homepage-post--list">
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
        <Link to="/posts/index">
          <button className="btn btn-block btn-homepage">Post</button>
        </Link>
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
