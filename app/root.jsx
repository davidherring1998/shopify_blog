import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  useRouteError,
} from "@remix-run/react";
import sylesGlobal from "~/styles/global.css";

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
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Shopify Coding 
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts/index">Posts</Link>
          </li>
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
        Oh no! An Error has occured, please contact support at
        support@upsidemicrophones.com
      </h4>
    </Document>
  );
}
