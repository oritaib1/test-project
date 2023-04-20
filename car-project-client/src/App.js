import "./App.css";
import Login from "./Screens/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Screens/Register/Register";
import Home from "./Screens/Home/Home";
import { NewProject } from "./Screens/NewProject/NewProject";
import AllProject from "./Screens/AllProject/AllProject";
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
    <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Info" element={<Home />} />
            <Route path="/Info/NewProject" element={<NewProject />} />
            <Route path="/Info/AllProject" element={<AllProject />} />
          </Routes>
        </Router>

    </div>
    </Provider>
  );
}

export default App;
