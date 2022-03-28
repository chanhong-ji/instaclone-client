import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Main = styled.main`
  max-width: 620px;
  margin: 0 auto;
  margin-top: 50px;
  background-color: ${(p) => p.theme.bgColor};
`;

function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet></Outlet>
      </Main>
    </>
  );
}

export default Layout;
