import React from "react";
import { Link, navigate } from "gatsby";
import Header from "../components/header";

export default function Home() {
  return (
    <div>
      <Header title="Index Page" />
      Hello World
      <Link to="/about">About</Link>
      <button
        onClick={() => {
          navigate("/about");
        }}
      >
        About page with Button
      </button>
    </div>
  );
}
