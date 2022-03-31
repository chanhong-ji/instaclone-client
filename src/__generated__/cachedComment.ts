/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: cachedComment
// ====================================================

export interface cachedComment_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface cachedComment {
  __typename: "Comment";
  id: number;
  payload: string;
  isMine: boolean;
  user: cachedComment_user;
  createdAt: string;
}
