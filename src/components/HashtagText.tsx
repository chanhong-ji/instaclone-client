import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const isHashtag = new RegExp(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\w]+/g);

const HashtagSpan = styled.span`
  color: ${(props) => props.theme.accentColor};
  &:hover {
    text-decoration: underline;
  }
`;

function HashtagText(text: string) {
  const list = text.split(" ").map((word, index) => {
    const hashtagList = word.match(isHashtag);
    if (hashtagList === null) {
      return <React.Fragment key={index}>{word} </React.Fragment>;
    } else {
      return (
        <React.Fragment key={index}>
          <Link to={`/hashtags/${hashtagList[0].slice(1)}`}>
            <HashtagSpan>{hashtagList[0]}</HashtagSpan>
          </Link>
          {word.substring(hashtagList[0].length)}{" "}
        </React.Fragment>
      );
    }
  });
  return list;
}
export default HashtagText;
