import React, { Suspense } from "react";
import Router from "./router";

const App: React.FC = () => {
  return (
    <Suspense fallback={<span>loading</span>}>
      <Router />
    </Suspense>
  );
};

export default App;
