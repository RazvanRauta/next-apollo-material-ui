import { useArtistsQuery } from '__generated__/src/graphQL/Artists.graphql'
import { ApolloError, NetworkStatus, ServerError } from '@apollo/client'
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'

import ArtistsGrid from '@/components/ArtistsGrid'
import Search from '@/components/Search'
import { ArtistsDocument } from '@/graphQL/Artists.graphql'
import { initializeApollo } from '@/lib/apollo'
import Artist from '@/models/Artist'

const useStyles = makeStyles((theme) => ({
  search: {
    '& input[type="text" i]': {
      padding: '5px 10px',
      fontSize: '18px',
      lineHeight: '22px',
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const Index: React.FC = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleToggle = () => {
    setOpen(!open)
  }

  const { loading, error, data, fetchMore, networkStatus } = useArtistsQuery({
    variables: {
      offset: 0,
      limit: 4,
    },
  })

  const classes = useStyles()

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
    <>
      <Box component="section" display="flex" flexDirection="column">
        <Box className={classes.search} mb={4}>
          <Search setOpen={setOpen} />
        </Box>

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
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
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
