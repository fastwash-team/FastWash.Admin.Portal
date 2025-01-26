import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
// import "./App.css";
import appRoutes from "@/router/routes";

function App() {
  return (
    <Suspense fallback={"Loading ..."}>
      <RouterProvider router={appRoutes} />
    </Suspense>
  );
}

export default App;
