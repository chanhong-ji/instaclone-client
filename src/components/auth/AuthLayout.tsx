import styled from "styled-components";

const Container = styled.section`
  /* outer */
  width: 500px;
  min-height: 700px;
  margin: 0 auto;

  /* inside */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* deco */
  border: 3px solid lightgray;
  background-color: ${(p) => p.theme.blockColor};
`;

function AuthLayout({ children }: any) {
  return <Container>{children}</Container>;
}

export default AuthLayout;
