import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: ${(props) => props.theme.bgcolor};
`;

const Main = styled.main``;

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
