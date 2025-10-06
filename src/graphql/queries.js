import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query RepositoriesQuery {
  repositories {
    edges {
      node {
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        id
        url
      }
    }
  }
}
`

export const GET_SINGLE_REPOSITORY = gql`
query RepositoryQuery($id: ID!) {
  repository(id: $id) {
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    id
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
  `

export const ME = gql`
query MeQuery {
  me {
    id
    username
  }
}
`