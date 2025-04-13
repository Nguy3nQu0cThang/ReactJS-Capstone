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
import CinemaPage from "./pages/CinemaPage";
import BookingPage from "./pages/BookingPage";
import ManagerPage from "./pages/ManagerPage";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MovieManagement from "./component/ManagerPage/MovieManagement";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <HistoryRouter history={navigateHistory}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<HomePageMaster />}>
                <Route index element={<MovieList />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="detail" element={<DetailPage />} />
                <Route path="detail/:maPhim" element={<DetailMovie />} />
                <Route path="cinema" element={<CinemaPage />} />
                <Route path="booking/:maLichChieu" element={<BookingPage />} />
              </Route>
              <Route path="admin" element={<ManagerPage />}>
                <Route index element={<MovieManagement />} />
                <Route path="login" element={<Login />} />
                <Route path="add" element={<AddMovie />} />
                <Route path="edit/:maPhim" element={<EditMovie />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </Provider>
      </HistoryRouter>
    </div>
  );
};

export default App;
