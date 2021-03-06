import { gql, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faDotCircle,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Avatar from "../Avatar";
import HashtagText from "../HashtagText";
import { FatText } from "../shared";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const Container = styled.article`
  background-color: ${(props) => props.theme.blockColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 25px;
  max-width: 615px;
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
    > a {
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
      cache.modify({
        id: `Photo:${id}`,
        fields: {
          likes: (prev: number, { readField }: any) =>
            readField("isLiked") ? prev - 1 : prev + 1,
          isLiked: (prev: boolean) => !prev,
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
          <Link to={`/users/${user.username}`}>
            <Avatar imgUrl={user.avatar || ""} />
          </Link>
          <Link to={`/users/${user.username}`}>
            <FatText>{user.username}</FatText>
          </Link>
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
          <FatText>?????????</FatText>
          <FatText> {likes}</FatText>
          <FatText>???</FatText>
        </Likes>
        <Explanation>
          <Link to={`/users/${user.username}`}>
            <FatText>{user.username} </FatText>
          </Link>
          {caption && HashtagText(caption)}
        </Explanation>
        <Comments count={commentCount} comments={comments ?? []} photoId={id} />
      </Info>
      <CommentForm photoId={id} />
    </Container>
  );
}
