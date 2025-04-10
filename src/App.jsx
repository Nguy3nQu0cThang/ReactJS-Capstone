import "./App.css";
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePageMaster from "./pages/HomePageMaster";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import { navigateHistory } from "./utils/setting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailPage from "./pages/DetailPage";
import MovieList from "./component/HomePage/MovieList";
import DetailMovie from "./component/DetailPage/DetailMovie";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <HistoryRouter history={navigateHistory}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="" element={<HomePageMaster />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/profile" element={<UserProfile />}></Route>
              <Route path="/detail" element={<DetailPage />}>
                <Route index element={<MovieList />} />
                <Route path=":maPhim" element={<DetailMovie />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </Provider>
      </HistoryRouter>
    </div>
  );
};

export default App;
