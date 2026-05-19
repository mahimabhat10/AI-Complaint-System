import { BrowserRouter, Routes, Route } from "react-router-dom";

import ComplaintForm from "./pages/ComplaintForm";
import ComplaintList from "./pages/ComplaintList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<ComplaintForm />}
        />

        <Route
          path="/complaints"
          element={<ComplaintList />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;