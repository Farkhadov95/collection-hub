import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import CreateCollectable from "./components/collection/CreateCollectable";
import Main from "./pages/Main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/user" element={<User />}>
        <Route path="create" element={<CreateCollectable />} />
      </Route>
      <Route path="/collection/:id" element={<Collection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
