import { gql, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAMENT } from "../fragment";
import useUser from "../hooks/useUser";
import { UpdateMutation } from "../types";
import { followUser, followUserVariables } from "../__generated__/followUser";
import { me, me_me } from "../__generated__/me";
import { seeProfile, seeProfile_seeProfile } from "../__generated__/seeProfile";
import {
  unfollowUser,
  unfollowUserVariables,
  unfollowUser_unfollowUser,
} from "../__generated__/unfollowUser";

const SEE_PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      bio
      avatar
      totalFollowing
      totalFollowers
      isMe
      isFollowing
      photos {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAMENT}
`;

const Header = styled.div`
  margin-top: 40px;
  width: 100%;
  min-height: 250px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  > div:first-child {
    width: 150px;
    height: 150px;
    justify-self: center;
  }
`;

const Intro = styled.div``;
const Detail = styled.div``;
const Div = styled.div``;
const Info = styled.div`
  margin-top: 10px;
  ${Intro} {
    span {
      font-size: 28px;
      margin-right: 28px;
    }
    button {
      height: 25px;
      margin-right: 5px;
    }
  }
  ${Detail} {
    margin-top: 5px;
    span {
      margin-right: 40px;
    }
  }
  ${Div} {
    margin-top: 20px;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
`;
interface IPhoto {
  imgUrl: string;
}

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  display: none;
  * {
    color: white;
  }
  > div {
    display: flex;
    height: 20px;
    &:first-child {
      margin-right: 40px;
    }
    svg {
      height: 20px;
      margin-right: 10px;
    }
  }
`;

const PhotoBox = styled.div<IPhoto>`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  background-color: grey;
  background-position: center;
  background-size: cover;
  position: relative;
  &:hover ${Overlay} {
    display: flex;
  }
`;

const FOLLOW_USER = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

function Profile() {
  const getButton = (seeProfile: seeProfile_seeProfile) => {
    if (seeProfile.isMe) {
      return <button>프로필 편집</button>;
    } else if (seeProfile.isFollowing) {
      return <button onClick={() => unfollowUser()}>언팔로우</button>;
    } else {
      return <button onClick={() => followUser()}>팔로우</button>;
    }
  };

  const followUpdate: UpdateMutation = (cache, result) => {
    const {
      followUser: { ok },
    } = result.data;
    if (!ok) return;
    // Update profile user's follow
    cache.modify({
      id: `User:${data?.seeProfile?.username}`,
      fields: {
        totalFollowers: (prev: number) => prev + 1,
        isFollowing: () => true,
      },
    });
    // Update me user's follow
    cache.modify({
      id: `User:${meData?.me?.username}`,
      fields: {
        totalFollowing: (prev: number) => prev + 1,
      },
    });
  };

  const unfollowUpdate: UpdateMutation = (cache, result) => {
    const {
      unfollowUser: { ok },
    } = result.data;
    if (!ok) return;
    cache.modify({
      id: `User:${data?.seeProfile?.username}`,
      fields: {
        totalFollowers: (prev: number) => prev - 1,
        isFollowing: () => false,
      },
    });
    cache.modify({
      id: `User:${meData?.me?.username}`,
      fields: {
        totalFollowing: (prev: number) => prev - 1,
      },
    });
  };

  const { username } = useParams();
  const meData: me | undefined = useUser();
  const { data, loading } = useQuery<seeProfile>(SEE_PROFILE, {
    variables: { username },
  });
  const [followUser] = useMutation<followUser, followUserVariables>(
    FOLLOW_USER,
    {
      variables: { username: data?.seeProfile?.username ?? "" },
      update: followUpdate,
    }
  );
  const [unfollowUser] = useMutation<unfollowUser, unfollowUserVariables>(
    UNFOLLOW_USER,
    {
      variables: { username: data?.seeProfile?.username ?? "" },
      update: unfollowUpdate,
    }
  );

  return (
    <>
      <PageTitle title={loading ? "Loading..." : `${username}`} />
      <Header>
        <Avatar imgUrl={data?.seeProfile?.avatar ?? ""} />
        <Info>
          <Intro>
            <span>{data?.seeProfile?.username}</span>
            {data?.seeProfile && getButton(data?.seeProfile)}
          </Intro>
          <Detail>
            <span>게시물 {data?.seeProfile?.photos?.length}</span>
            <span>팔로워 {data?.seeProfile?.totalFollowers}</span>
            <span>팔로우 {data?.seeProfile?.totalFollowing}</span>
            <span></span>
          </Detail>
          <Div>
            <span>우선 예시 글</span>
          </Div>
        </Info>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo) => (
          <PhotoBox
            key={photo?.id}
            imgUrl={photo?.file ?? ""}
            style={{ backgroundImage: `url(${photo?.file})` }}
          >
            <Link to="/">
              <Overlay>
                <div>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>{photo?.likes}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faComment} />
                  <span>{photo?.commentCount}</span>
                </div>
              </Overlay>
            </Link>
          </PhotoBox>
        ))}
      </Grid>
    </>
  );
}

export default Profile;
