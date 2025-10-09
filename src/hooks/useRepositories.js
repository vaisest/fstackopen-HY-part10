import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (sorting, search) => {
    const sortingMap = {
        "latest": {
            orderBy: "CREATED_AT", orderDirection: "DESC"
        },
        "highestRatedFirst": {
            orderBy: "RATING_AVERAGE", orderDirection: "DESC"
        },
        "lowestRatedFirst": {
            orderBy: "RATING_AVERAGE", orderDirection: "ASC"
        }
    }
    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { ...sortingMap[sorting], searchKeyword: search }
    });
    return { repositories: data ? data.repositories : undefined, loading, error, refetch };
};

export default useRepositories;