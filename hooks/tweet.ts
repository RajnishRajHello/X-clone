import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "../graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTweetDate } from "../gql/graphql";
import { createTweetMutation } from "../graphql/mutation/tweet";
import toast from "react-hot-toast";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateTweetDate) =>
      graphqlClient.request(createTweetMutation as any, { payload }),
    onMutate: (payload) => toast.loading("Creating Tweet", {id: '1'}),
    onSuccess: async(payload) => {
     await queryClient.invalidateQueries({ queryKey: ["all-tweets"] }),
     toast.success('Created Successfully', { id: '1'})
    }
      
  });

  return mutation;
};

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweetsQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};
