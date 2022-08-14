import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

// const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  //   <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
  </RecoilRoot> //recoil을 시작하는 방법

  //   </React.StrictMode>
);
