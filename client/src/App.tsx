import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// routes
import Home from "./routes/Home/Home";
import Mypage from "./routes/Mypage/Mypage";
import Signup from "./routes/Signup/Signup";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* home page */}
          <Route exact path="/" component={Home} />
          {/* Mypage */}
          <Route exact path="/mypage" component={Mypage} />
          {/* signup */}
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
