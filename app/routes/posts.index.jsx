import { useLoaderData, Link } from "@remix-run/react";

export const loader = () => {
  const data = {
    posts: [
      { id: 1, title: "Title One", body: "Body One" },
      { id: 2, title: "Title Two", body: "Body Two" },
      { id: 3, title: "Title Three", body: "Body Three" },
      { id: 4, title: "Title Four", body: "Body Four" },
    ],
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
              <Link to={post.id}>
                <h2>{post.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
