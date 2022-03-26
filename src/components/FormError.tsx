import styled from "styled-components";

const Text = styled.span`
  background-color: orange;
`;

function FormError({ text }: { text: string | null }) {
  return <Text>{text}</Text>;
}

export default FormError;
