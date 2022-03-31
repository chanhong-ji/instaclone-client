import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";
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
const Payload = styled.span`
  a {
    color: ${(props) => props.theme.accentColor};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const isHashtag = new RegExp(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\w]+/g);

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
      <FatText>{author} </FatText>
      <Payload>
        {payload.split(" ").map((word, index) => {
          const hashtagList = word.match(isHashtag);
          if (hashtagList === null) {
            return <React.Fragment key={index}>{word} </React.Fragment>;
          } else {
            return (
              <React.Fragment key={index}>
                <Link to={`/hashtags/${hashtagList[0].slice(1)}`}>
                  {hashtagList[0]}
                </Link>
                {word.substring(hashtagList[0].length)}{" "}
              </React.Fragment>
            );
          }
        })}
      </Payload>
      {isMine ? (
        <button onClick={onCommentDelete}>Delete comment</button>
      ) : null}
    </Container>
  );
}
export default Comment;
