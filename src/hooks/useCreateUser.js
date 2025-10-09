import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
const useCreateUser = () => {
    const [mutate, { data }] = useMutation(CREATE_USER);

    const createUser = async ({ password, username }) => {
        return await mutate({ variables: { user: { password, username } } });
    };

    return [createUser, data];
}
export default useCreateUser