import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";
const useCreateReview = () => {
    const [mutate, { data }] = useMutation(CREATE_REVIEW);

    const createReview = async ({ ownerName, rating, repositoryName, text }) => {
        return await mutate({ variables: { review: { ownerName, rating, repositoryName, text } } });
    };

    return [createReview, data];
}
export default useCreateReview