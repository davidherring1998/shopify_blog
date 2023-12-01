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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts/index">Blogs</Link>
          </li>
          {user ? (
            <ul className="nav">
              <li>
                <Link to="/posts/new">Create</Link>
              </li>
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
