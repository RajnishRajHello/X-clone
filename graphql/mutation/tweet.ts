import { graphql } from "../../gql";

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetDate!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);