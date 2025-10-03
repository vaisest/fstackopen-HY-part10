import { useMutation } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHENTICATE);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const result = await mutate({ variables: { credentials: { username, password } } });
        await authStorage.setAccessToken(result.data.authenticate.accessToken);
        apolloClient.resetStore();
        return result;
    };

    return [signIn, result];
};

export default useSignIn;