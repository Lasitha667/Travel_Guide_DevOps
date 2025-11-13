import { Routes, Route } from "react-router-dom";

import SignUp from "./assets/Components//Signup/Signup";
import Login from "./assets/Components/Login/Login";
import Home from "./assets/Components/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
