import { gql, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faDotCircle,
  faFaceSmile,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import Comments from "./Comments";

const Container = styled.article`
  background-color: ${(props) => props.theme.blockColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 25px;
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
  }
  ${Column} {
    display: flex;
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

const ActiveBtn = styled.div`
  height: 20px;
  cursor: pointer;
  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3) {
    margin-right: 20px;
  }
`;

const CommentForm = styled.div`
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

const TOGGLE_LIKE = gql`
  mutation toggleLike($photoId: Int!) {
    toggleLike(photoId: $photoId) {
      ok
      error
    }
  }
`;

export default function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentCount,
  comments,
}: seeFeed_seeFeed) {
  const updateLikes = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      cache.writeFragment({
        id: `Photo:${id}`,
        fragment: gql`
          fragment updatedLike on Photo {
            isLiked
            likes
          }
        `,
        data: {
          likes: isLiked ? likes - 1 : likes + 1,
          isLiked: !isLiked,
        },
      });
    }
  };

  const [toggleLike] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE,
    {
      variables: { photoId: id },
      update: updateLikes,
    }
  );

  return (
    <Container>
      <Header>
        <div>
          <Avatar imgUrl={user.avatar || ""} />
          <FatText>{user.username}</FatText>
        </div>
        <FontAwesomeIcon icon={faDotCircle} size="lg" />
      </Header>
      <Image>
        <img src={file} />
      </Image>
      <Info>
        <Icons>
          <Column>
            <ActiveBtn
              onClick={() => toggleLike()}
              style={{ color: isLiked ? "#ed4956" : "black" }}
            >
              <FontAwesomeIcon
                icon={isLiked ? solidHeart : faHeart}
                size="lg"
              />
            </ActiveBtn>
            <ActiveBtn>
              <FontAwesomeIcon icon={faComment} size="lg" />
            </ActiveBtn>
            <ActiveBtn>
              <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </ActiveBtn>
          </Column>
          <Column>
            <ActiveBtn>
              <FontAwesomeIcon icon={faBookmark} size="lg" />
            </ActiveBtn>
          </Column>
        </Icons>
        <Likes>
          <FatText>좋아요</FatText>
          <FatText> {likes}</FatText>
          <FatText>개</FatText>
        </Likes>
        <Explanation>
          <FatText>{user.username}</FatText>
          <span> {caption}</span>
        </Explanation>
        <Comments count={commentCount} comments={comments} />
      </Info>
      <CommentForm>
        <div>
          <FontAwesomeIcon icon={faFaceSmile} size="lg" />
        </div>
        <form>
          <input placeholder="comment..." />
        </form>
      </CommentForm>
    </Container>
  );
}
