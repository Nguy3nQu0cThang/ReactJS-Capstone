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


const App = () => {
  return (
    <div>
      <HistoryRouter history={navigateHistory}>
        <Provider store={store}>
          <Routes>
            <Route path="" element={<HomePageMaster />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
          </Routes>
        </Provider>
      </HistoryRouter>
    </div>
  );
};

export default App;
