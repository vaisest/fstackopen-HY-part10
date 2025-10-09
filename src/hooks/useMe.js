import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';


const useMe = (withReviews) => {
    const { data, error, loading, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: {
            withReviews: !!withReviews
        }
    });
    const username = data && data.me ? data.me.username : undefined;
    const reviews = username && withReviews ? data.me.reviews.edges.map(it => it.node) : undefined
    return { username, loading, error, refetch, reviews };
};

export default useMe;