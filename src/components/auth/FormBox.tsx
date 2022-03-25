import styled from "styled-components";

const STopBox = styled.div`
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
    }
    button {
    }
  }
`;

function Topbox({ children }: any) {
  return <STopBox>{children}</STopBox>;
}

export default Topbox;
