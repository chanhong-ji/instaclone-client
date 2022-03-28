import styled from "styled-components";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(p) => p.theme.blockColor};
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

function Avatar({ imgUrl = "" }) {
  return <Wrapper>{imgUrl !== "" ? <img src={imgUrl} /> : null}</Wrapper>;
}

export default Avatar;
