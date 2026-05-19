import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ComplaintForm from "./pages/ComplaintForm";
import ComplaintList from "./pages/ComplaintList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/"
          element={
            token
              ? <ComplaintForm />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/complaints"
          element={
            token
              ? <ComplaintList />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;