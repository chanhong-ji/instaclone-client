import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";
import HashtagText from "../HashtagText";
import { FatText } from "../shared";

interface IComment {
  id: number;
  photoId: number;
  author: string;
  payload: string;
  isMine: boolean;
}

const Container = styled.div`
  margin-top: 10px;
`;
const Payload = styled.span``;

const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      ok
    }
  }
`;

function Comment({ id, photoId, author, payload, isMine }: IComment) {
  const updateComment = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (!ok) return;
    cache.evict({ id: `Comment:${id}` });
    cache.modify({
      id: `Photo:${photoId}`,
      fields: {
        commentCount: (prev: number) => prev - 1,
      },
    });
  };

  const [deleteComment] = useMutation<deleteComment, deleteCommentVariables>(
    DELETE_COMMENT,
    {
      variables: { commentId: id },
      update: updateComment,
    }
  );

  const onCommentDelete = () => {
    deleteComment();
  };

  return (
    <Container>
      <FatText>
        <Link to={`/users/${author}`}>{author} </Link>
      </FatText>
      <Payload>{HashtagText(payload)}</Payload>
      {isMine ? (
        <button onClick={onCommentDelete}>Delete comment</button>
      ) : null}
    </Container>
  );
}
export default Comment;
