import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(
  `
    query verifyUserGoogleToken($token: String!) {
      verifyGoogleToken(token: $token)
    }
  `
);
