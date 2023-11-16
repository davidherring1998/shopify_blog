import { Outlet } from "@remix-run/react";

// Creating '/posts/' outlet
export default function Posts() {
  return (
    <>
      <Outlet />
    </>
  );
}
