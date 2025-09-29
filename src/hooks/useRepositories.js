import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = () => {
    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });
    return { repositories: data ? data.repositories : undefined, loading, error, refetch };
};

export default useRepositories;