import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// routes
import Home from "./routes/Home/Home";
import Mypage from "./routes/Mypage/Mypage";
import Signup from "./routes/Signup/Signup";
// useContext
import { InputProvider } from "./context/InputContext";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* home page */}
          <Route exact path="/">
            <InputProvider>
              <Home />
            </InputProvider>
          </Route >
          {/* Mypage */}
          <Route exact path="/mypage" component={Mypage} />
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
