import { Link, Links, LiveReload, Meta, Outlet } from "@remix-run/react";
import globalStyles from "~/styles/global.css";

export const links = () => [{ rel: "stylesheet", href: globalStyles }];
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
          Shopify Blog
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
