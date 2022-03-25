import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  background-color: ${(props) => props.theme.bgcolor};
`;

function Layout() {
  return (
    <>
      <Main>
        <Outlet></Outlet>
      </Main>
    </>
  );
}

export default Layout;
