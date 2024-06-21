import React from "react";
import Header from "./Header";
import Client from "./Client";
import Service from "./Service";
import { Auth } from "./Auth";

function App() {
  return (
    <>
      <Header />
      <Auth />
      <Client />
      <Service />
    </>
  );
}

export default App;
