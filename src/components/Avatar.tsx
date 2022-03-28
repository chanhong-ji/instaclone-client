import styled from "styled-components";

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: grey;
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
