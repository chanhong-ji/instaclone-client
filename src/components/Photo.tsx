import {
  faBookmark,
  faComment,
  faEllipsis,
  faFaceSmile,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";
import Avatar from "./Avatar";
import { FatText } from "./shared";

const Container = styled.article`
  background-color: ${(props) => props.theme.blockColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 25px;
  * {
    svg {
      path {
        color: white;
        stroke: black;
        stroke-width: 50px;
      }
    }
  }
`;

const Header = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  > div {
    display: flex;
    align-items: center;
    > div {
      :first-child {
        margin: 0 15px;
      }
    }
  }
`;

const Image = styled.div`
  height: 613px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Icons = styled.div``;
const Column = styled.div``;
const Likes = styled.div``;
const Explanation = styled.div``;
const Info = styled.div`
  min-height: 142px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 17px;
  ${Icons} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${Column} {
      &:first-child {
        div {
          margin-right: 20px;
        }
      }
      display: flex;
      > div {
        height: 20px;
      }
    }
  }
  ${Likes} {
    margin-top: 20px;
  }
  ${Explanation} {
    margin-top: 15px;
    span {
      font-size: 14px;
    }
  }
`;

const Comment = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  > div {
    height: 20px;
  }
  > form {
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    input {
      width: 100%;
    }
  }
`;

export default function Photo({ photo }: { photo: seeFeed_seeFeed }) {
  return (
    <Container>
      <Header>
        <div>
          <Avatar imgUrl={photo.user.avatar || ""} />
          <FatText>{photo.user.username}</FatText>
        </div>
        <FontAwesomeIcon icon={faEllipsis} size="lg" />
      </Header>
      <Image>
        <img src={photo.file} />
      </Image>
      <Info>
        <Icons>
          <Column>
            <div>
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </div>
            <div>
              <FontAwesomeIcon icon={faComment} size="lg" />
            </div>
            <div>
              <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </div>
          </Column>
          <Column>
            <div>
              <FontAwesomeIcon icon={faBookmark} size="lg" />
            </div>
          </Column>
        </Icons>
        <Likes>
          <FatText>좋아요</FatText>
          <FatText> {photo.likes}</FatText>
          <FatText>개</FatText>
        </Likes>
        <Explanation>
          <FatText>{photo.user.username}</FatText>
          <span> {photo.caption}</span>
        </Explanation>
      </Info>
      <Comment>
        <div>
          <FontAwesomeIcon icon={faFaceSmile} size="lg" />
        </div>
        <form>
          <input placeholder="comment..." />
        </form>
      </Comment>
    </Container>
  );
}
