import { useParams } from "@remix-run/react";

export default function Post() {
  const params = useParams();
  return (
    <div>
      <h1>Single Post {params.postsId} </h1>
    </div>
  );
}
