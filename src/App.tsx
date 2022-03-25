import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./styles";
import Layout from "./screens/Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/404";
import Signup from "./screens/Signup";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
