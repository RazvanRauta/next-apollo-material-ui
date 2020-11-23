import { useArtistsQuery } from '__generated__/src/graphQL/Artists.graphql'
import { ApolloError, NetworkStatus, ServerError } from '@apollo/client'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import { GetStaticProps } from 'next'
import React from 'react'

import ArtistsGrid from '@/components/ArtistsGrid'
import { ArtistsDocument } from '@/graphQL/Artists.graphql'
import { initializeApollo } from '@/lib/apollo'
import Artist from '@/models/Artist'

const Index: React.FC = () => {
  const { loading, error, data, fetchMore, networkStatus } = useArtistsQuery({
    variables: {
      offset: 0,
      limit: 4,
    },
  })
  let artistsData: Artist[] | undefined = []

  const loadingMoreArtists = networkStatus === NetworkStatus.fetchMore

  if (error) return <p>Error</p>
  if ((loading && !loadingMoreArtists) || !data)
    return (
      <div>
        Loading.. <CircularProgress color="secondary" />
      </div>
    )

  const { artists } = data

  artistsData = artists?.map((artist) => new Artist({ ...artist }))

  const loadMoreArtists = () => {
    if (typeof fetchMore !== 'undefined') {
      fetchMore({
        variables: {
          offset: artists?.length,
        },
      })
    }
  }

  /*
   * Normally the total amount of "artists" is provided by the server. I hard code it here to 23
   *
   */

  const areMoreArtists = artists && artists?.length < 23

  return (
    <Box component="section" display="flex" flexDirection="column">
      <Typography gutterBottom variant="h4">
        All artists
      </Typography>

      {artistsData && <ArtistsGrid artists={artistsData} />}

      {areMoreArtists && (
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => loadMoreArtists()}
            disabled={loadingMoreArtists}>
            {loading && !data ? (
              <CircularProgress color="secondary" />
            ) : (
              <Typography variant="body1">Show More</Typography>
            )}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  try {
    await apolloClient.query({
      query: ArtistsDocument,
      variables: {
        offset: 0,
        limit: 4,
      },
    })

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 1,
    }
  } catch (err: unknown | ApolloError) {
    if (err instanceof ApolloError) {
      const { networkError } = err
      if ((networkError as ServerError)?.result) {
        const {
          //@ts-ignore
          result: { errors },
        } = networkError
        console.log({ errors })
      }
    }
    console.log({ err })
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default Index
