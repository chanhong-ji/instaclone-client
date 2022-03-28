import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import useUser from "../hooks/useUser";

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: ${(props) => props.theme.bgcolor};
`;

const Main = styled.main`
  /* max-width: ; */
  margin-top: 50px;
`;

function Layout() {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet></Outlet>
      </Main>
    </Container>
  );
}

export default Layout;
