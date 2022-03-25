import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

function SocialLogin() {
  return (
    <Container>
      <Link to="/github">
        <span>Log in with Gitgub</span>
      </Link>
    </Container>
  );
}

export default SocialLogin;
