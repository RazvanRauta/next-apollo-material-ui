/* eslint-disable react-hooks/rules-of-hooks */
import { useArtworksQuery } from '__generated__/src/graphQL/Artworks.graphql'
import { NetworkStatus } from '@apollo/client'
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

import useStyles from './styles'

interface ArtworksGridProps {
  artistId: number | null | undefined
  artworksTotal: number | null | undefined
}

const ArtworksGrid: React.FC<ArtworksGridProps> = ({
  artistId,
  artworksTotal,
}) => {
  const classes = useStyles()

  const { data, error, loading, fetchMore, networkStatus } = useArtworksQuery({
    variables: {
      artistId: artistId ?? 0,
      limit: 3,
      offset: 0,
    },
  })

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const loadingMoreArtworks = networkStatus === NetworkStatus.fetchMore

  if (error) return <p>Error</p>
  if ((loading && !loadingMoreArtworks) || !data)
    return (
      <div>
        Loading.. <CircularProgress color="secondary" />
      </div>
    )

  const { artworks } = data

  const areMoreArtworks =
    artworks && artworksTotal && artworks?.length < artworksTotal

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (areMoreArtworks && typeof fetchMore !== 'undefined') {
        fetchMore({
          variables: {
            offset: artworks?.length,
            limit: 3,
          },
        })
      }
    }
  }

  return (
    <>
      <Grid
        container
        className={classes.root}
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={12}>
          <Grid container justify="center" className={classes.inner}>
            {artworks &&
              artworks.map((artwork) => (
                <Grid key={artwork?.id} item xs>
                  <Box
                    display="flex"
                    flexDirection="column"
                    className={classes.artworkCard}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="flex-start"
                      justifyContent="center">
                      <img
                        className={classes.image}
                        src={
                          artwork?.lotImagePresignedUrl ||
                          'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png'
                        }
                        alt={artwork?.name || 'Artwork Image'}
                      />
                    </Box>
                    <Box display="flex" flexDirection="column" p={1} mt={2}>
                      {artwork?.name && (
                        <Typography>{artwork?.name}</Typography>
                      )}
                      {artwork?.currentEstimatedPrice && (
                        <Typography>{`Current estimated price: USD $${artwork?.currentEstimatedPrice.toLocaleString()}`}</Typography>
                      )}
                      {artwork?.lastPrice &&
                        artwork?.placeLastSold &&
                        artwork?.dateLastSold && (
                          <Typography>{`Last recorded sale: $${artwork?.lastPrice.toLocaleString()} at ${
                            artwork?.placeLastSold
                          } (${new Date(
                            artwork?.dateLastSold,
                          ).getFullYear()})`}</Typography>
                        )}
                      {artwork?.measurementsHeight &&
                        artwork?.measurementsWidth && (
                          <Typography>{`Dimensions: ${artwork?.measurementsHeight} x ${artwork?.measurementsWidth} inches`}</Typography>
                        )}
                      {artwork?.priceMomentum24mo && (
                        <Typography>{`Price momentum: ${artwork?.priceMomentum24mo.toLocaleString()}`}</Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      {loadingMoreArtworks && (
        <Box
          display="flex"
          flexDirection="row"
          mt={2}
          justifyContent="center"
          alignItems="center">
          <CircularProgress color="secondary" />
        </Box>
      )}
    </>
  )
}

export default ArtworksGrid
