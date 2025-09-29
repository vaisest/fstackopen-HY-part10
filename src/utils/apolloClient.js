import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


const createApolloClient = () => {
    return new ApolloClient({
        // "To initialize Apollo Client, you must specify a 'link' property in the options object."
        link: new HttpLink({ uri: 'http://10.10.12.192:4000/graphql' }),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;