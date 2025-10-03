import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';


const useMe = () => {
    const { data, error, loading, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
    });
    const username = data && data.me ? data.me.username : undefined;
    return { username, loading, error, refetch };
};

export default useMe;