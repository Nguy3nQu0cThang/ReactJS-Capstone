import "./App.css";
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { navigateHistory } from "./utils/demoSetting";
import HomePageMaster from "./pages/HomePageMaster";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <div>
      <HistoryRouter history={navigateHistory}>
        <Provider store={store}>
          <Routes>
            <Route path="" element={<HomePageMaster />}></Route>
          </Routes>
        </Provider>
      </HistoryRouter>
    </div>
  );
};

export default App;
