import { gql, useMutation } from "@apollo/client";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import {
  createComment,
  createCommentVariables,
} from "../../__generated__/createComment";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";

interface IForm {
  payload: string;
}

const Container = styled.div`
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

const CREATE_COMMENT = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

function CommentForm({ photoId }: { photoId: number }) {
  const { register, handleSubmit, getValues, setValue } = useForm<IForm>();
  const user = useUser();
  const commentCacheUpdate = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && user?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        payload,
        isMine: true,
        user: { ...user.me },
      };

      const cachedComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment cachedComment on Comment {
            id
            payload
            isMine
            user {
              username
              avatar
            }
            createdAt
          }
        `,
      });

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentCount(prev: number) {
            return prev + 1;
          },
          comments(prev: any) {
            return [...prev, cachedComment];
          },
        },
      });
    }
  };

  const [createComment] = useMutation<createComment, createCommentVariables>(
    CREATE_COMMENT
  );

  const onValid = () => {
    const { payload } = getValues();
    createComment({
      variables: { photoId, payload: payload },
      update: commentCacheUpdate,
    });
  };

  return (
    <Container>
      <div>
        <FontAwesomeIcon icon={faFaceSmile} size="lg" />
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("payload", { required: true, maxLength: 300 })}
          placeholder="댓글 달기..."
        />
      </form>
    </Container>
  );
}

export default CommentForm;
