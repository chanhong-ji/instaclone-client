import styled from "styled-components";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import Comment from "./Comment";

const Container = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  display: block;
  font-size: 13px;
  opacity: 0.6;
  cursor: pointer;
`;

interface IProps {
  count: number;
  comments: (seeFeed_seeFeed_comments | null)[];
  photoId: number;
}

function Comments({ count, comments, photoId }: IProps) {
  return (
    <Container>
      <CommentCount>
        {count === 0 ? null : `댓글 ${count}개 모두 보기`}
      </CommentCount>
      {comments.map((comment) => {
        if (comment !== null)
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              photoId={photoId}
              author={comment.user.username}
              payload={comment.payload}
              isMine={comment.isMine}
            />
          );
      })}
    </Container>
  );
}

export default Comments;
