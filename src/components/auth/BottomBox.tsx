import { Link } from "react-router-dom";
import styled from "styled-components";

const SBottomBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function BottomBox({ to, text }: any) {
  return (
    <SBottomBox>
      <span>{text}</span>
      <Link to={to}>{to === "/signup" ? "Sign Up" : "Login"}</Link>
    </SBottomBox>
  );
}

export default BottomBox;
