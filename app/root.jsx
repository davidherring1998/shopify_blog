import {
  Link,
  Links,
  LiveReload,
  Meta,
  useLoaderData,
  Outlet,
  useRouteError,
} from "@remix-run/react";
import sylesGlobal from "~/styles/global.css";
import { getUser } from "./utils/session.server";

export const links = () => [{ rel: "stylesheet", href: sylesGlobal }];
export const meta = () => {
  const description = "Shopify Coding Blog about Remix built with Remix.";
  const keywords = "Shopify, Remix, Coding, Blog";
  return [
    {
      description,
      keywords,
    },
  ];
};

export const loader = async ({ request }) => {
  const user = await getUser(request);
  const data = {
    user,
  };
  return data;
};

export default function App() {
  return (
    <>
      <Document>
        <Layout>
          <Outlet />
        </Layout>
      </Document>
    </>
  );
}

function Document({ children, title }) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <Meta />
        <Links />
        <title>{title ? title : "Shopify Coding Blog"}</title>
      </head>
      <body>
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        {children}
      </body>
    </html>
  );
}

function Layout({ children }) {
  const { user } = useLoaderData();
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Shopify Crafters
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts/index">Blogs</Link>
          </li>
          <li>
            <Link to="/posts/new">Create</Link>
          </li>
          {user ? (
            <ul className="nav">
              <li>
                <form action="/auth/logout" method="POST">
                  <button type="submit" id="btn-logout">
                    Logout
                  </button>
                </form>
              </li>
            </ul>
          ) : (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="container">{children}</div>

      {/* <footer>
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
              QUICKLINKS
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
      </footer> */}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <Document>
      <Layout />
      <h4>
        Oh no! An Error has occured, please contact support at support@gmail.com
      </h4>
    </Document>
  );
}
