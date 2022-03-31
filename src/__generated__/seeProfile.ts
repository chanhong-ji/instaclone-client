/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_photos {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likes: number;
  commentCount: number;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  username: string;
  bio: string | null;
  avatar: string | null;
  totalFollowing: number | null;
  totalFollowers: number | null;
  isMe: boolean;
  isFollowing: boolean;
  photos: (seeProfile_seeProfile_photos | null)[] | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  username: string;
}
