import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { getUserLogout, isLoggedInVar } from "../apollo";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, { skip: !hasToken });
  useEffect(() => {
    if (data?.me === null) getUserLogout();
  }, [data]);
  return data;
}

export default useUser;
