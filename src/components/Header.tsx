import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUserLogout, isLoggedInVar } from "../apollo";

const Container = styled.header`
  width: inherit;
  height: 50px;

  background-color: ${(p) => p.theme.blockColor};
`;

const Items = styled.ul``;

const Item = styled.li``;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Container>
      <Items>
        {isLoggedIn ? (
          <Item onClick={getUserLogout}>Logout</Item>
        ) : (
          <Item>
            <Link to="/login">Login</Link>
          </Item>
        )}
      </Items>
    </Container>
  );
}

export default Header;
