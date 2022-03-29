import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

interface IComment {
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

function Comment({ author, payload, isMine }: IComment) {
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
    </Container>
  );
}
export default Comment;
