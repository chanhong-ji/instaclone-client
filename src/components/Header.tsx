import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUserLogout, isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";

const Container = styled.header`
  width: 100%;
  height: 80px;
  padding: 10px;
  background-color: ${(p) => p.theme.blockColor};
`;

const Wrapper = styled.div`
  /* max-width:  */
  display: flex;
`;

const Column = styled.div`
  width: 50%;
`;

const Items = styled.div`
  display: flex;
`;

const Item = styled.li``;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const data = useUser();
  return (
    <Container>
      <Wrapper>
        <Column>
          <Item>
            <Link to="/">Home</Link>
          </Item>
        </Column>
        <Column>
          {isLoggedIn ? (
            <Items>
              <Item onClick={getUserLogout}>Logout</Item>
              <Item>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar imgUrl={data?.me?.avatar || ""} />
                </Link>
              </Item>
            </Items>
          ) : (
            <Items>
              <Item>
                <Link to="/login">Login</Link>
              </Item>
              <Item>
                <Link to="signup">Sign Up</Link>
              </Item>
            </Items>
          )}
        </Column>
      </Wrapper>
    </Container>
  );
}

export default Header;
