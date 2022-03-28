import { gql, useQuery } from "@apollo/client";
import Photo from "../components/Photo";
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
        if (photo) return <Photo photo={photo} key={photo.id} />;
      })}
    </>
  );
}

export default Home;
