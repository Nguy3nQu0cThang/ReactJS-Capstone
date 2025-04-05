import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from "react-router-dom";
import { navigateHistory } from "./utils/setting";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePageMaster from "./MasterPages/HomePageMaster"
import HomePage from "./pages/HomePage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <div className="">
      <HistoryRouter history={navigateHistory}>
        <Provider store={store}>
          {/* <QueryClientProvider > */}
            <Routes>
              <Route path="" element={<HomePageMaster/>}>
                <Route index element={<HomePage/>}></Route>
              </Route>
            </Routes>
          {/* </QueryClientProvider> */}
        </Provider>
      </HistoryRouter>
    </div>
  );
};

export default App;
