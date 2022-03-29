import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import { seeFeed } from "../__generated__/seeFeed";

const SEE_FEED = gql`
  query seeFeed {
    seeFeed {
      id
      file
      caption
      likes
      comments
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
`;

function Home() {
  const { data } = useQuery<seeFeed>(SEE_FEED);

  return (
    <>
      {data?.seeFeed?.map((photo) => {
        if (photo) return <Photo key={photo.id} {...photo} />;
      })}
    </>
  );
}

export default Home;
