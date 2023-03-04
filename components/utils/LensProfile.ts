import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://api.lens.dev'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

/* define a GraphQL query  */
export const defaultProfileByWalletAddress = gql`
query DefaultProfile($ethereumAddress: EthereumAddress!) {
    defaultProfile(request: { ethereumAddress: $ethereumAddress }) {
      id
      name
      bio
      isDefault
      handle
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      ownedBy
    }
  }
`

export const ensByProfileId = gql`
query Profile($profileId: ProfileId!) {
    profile(request: { profileId: $profileId }) {
      onChainIdentity {
        ens {
          name
        }
      }
    }
  }
`

export const getFollowing = gql`query Following($ethereumAddress: EthereumAddress!){
    following(request: { 
                  address: $ethereumAddress,
                limit: 25
               }) {
      items {
        profile {
          id
          name
          bio
          followNftAddress
          metadata
          isDefault
          handle
          picture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                width
                height
                mimeType
              }
              medium {
                url
                width
                height
                mimeType
              }
              small {
                url
                width
                height
                mimeType
              }
            }
          }
          coverPicture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                width
                height
                mimeType
              }
              small {
                width
                url
                height
                mimeType
              }
              medium {
                url
                width
                height
                mimeType
              }
            }
          }
          ownedBy

        }
      }
    }
  }`