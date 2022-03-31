import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Main = styled.main`
  max-width: 935px;
  margin: 0 auto;
  background-color: ${(p) => p.theme.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
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
