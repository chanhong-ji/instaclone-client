import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAMENT } from "../fragment";
import { seeFeed } from "../__generated__/seeFeed";

export const SEE_FEED = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      comments {
        ...CommentFragment
      }
      isMine
      isLiked
      createdAt
      updatedAt
      user {
        id
        username
        avatar
      }
    }
  }
  ${PHOTO_FRAMENT}
  ${COMMENT_FRAGMENT}
`;

function Home() {
  const { data } = useQuery<seeFeed>(SEE_FEED);
  return (
    <>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => {
        if (photo) return <Photo key={photo.id} {...photo} />;
      })}
    </>
  );
}

export default Home;
