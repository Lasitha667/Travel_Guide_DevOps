import { Routes, Route } from "react-router-dom";

import SignUp from "./assets/Components//Signup/Signup";
import Login from "./assets/Components/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
