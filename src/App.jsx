import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import AuthRoute from "./auth/AuthRoute";
import Register from "./auth/Register";
import Login from "./auth/Login";
import AuthAdmin from "./auth/AuthAdmin";
import MenuPage from "./pages/MenuPage";
import HistoriPage from "./pages/HistoriPage";
import CreatePage from "./admin/CreatePage";
import { useEffect, useState } from "react";
import { AppProvider } from "./context/AppContext";

function App() {
  // const [theme, setTheme] = useState(false);
  // const [userData, setUserData] = useState();
  // const [dataUser, setDataUser] = useState([]);

  // useEffect(() => {
  //   const darkModeEnabled = localStorage.getItem("darkMode");
  //   setTheme(darkModeEnabled === "true");
  // }, []);
  // if (theme) {
  //   document.documentElement.classList.add("dark");
  // } else {
  //   document.documentElement.classList.remove("dark");
  // }

  return (
    // <AppProvider value={{ theme, setTheme, userData, dataUser }}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/histori" element={<HistoriPage />} />

      <Route element={<AuthRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route element={<AuthAdmin />}>
        <Route path="/admin" element={<CreatePage />} />
      </Route>
    </Routes>
    // </AppProvider>
  );
}

export default App;
