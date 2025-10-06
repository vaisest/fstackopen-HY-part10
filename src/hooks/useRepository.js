import { useQuery } from '@apollo/client/react';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';


const useRepository = (id) => {
    const { data, error, loading, refetch } = useQuery(GET_SINGLE_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id },
    });
    const repository = loading || error ? undefined : data.repository;
    const reviews = loading || error ? undefined : data.repository.reviews.edges.map(it => it.node);
    return { repository, reviews, loading, error, refetch };
};

export default useRepository;