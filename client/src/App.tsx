import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// routes
import Home from "./routes/Home/Home";
import Mypage from "./routes/Mypage/Mypage";
import Signup from "./routes/Signup/Signup";
import Edit from "./routes/Edit/Edit";
// useContext
import { InputProvider } from "./context/InputContext";
import { ErrorFromMypageProvider } from './context/ErrorFromMypageContext';
const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* home page */}
          <Route exact path="/">
            <ErrorFromMypageProvider>
              <InputProvider>
                <Home />
              </InputProvider>
            </ErrorFromMypageProvider>
          </Route >
          {/* Mypage */}
          <Route exact path="/mypage">
            <ErrorFromMypageProvider>
              <Mypage />
            </ErrorFromMypageProvider>
          </Route>
          {/* edit item */}
          <Route exact path="/mypage/item/:id">
            <ErrorFromMypageProvider>
              <Edit />
            </ErrorFromMypageProvider>
          </Route>
          {/* signup */}
          <Route exact path="/signup">
            <InputProvider>
              <Signup />
            </InputProvider>
          </Route>

        </Switch>
      </div>
    </Router >
  );
}

export default App;
