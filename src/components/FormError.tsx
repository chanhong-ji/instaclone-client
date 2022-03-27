import styled from "styled-components";

const Text = styled.span`
  background-color: orange;
`;

function FormError({ text }: { text: string | undefined }) {
  return text ? <Text>{text ? text : null}</Text> : null;
}

export default FormError;
