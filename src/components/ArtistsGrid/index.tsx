/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 13:28
 */

import { Artist } from '__generated__/src/graphQL/Artists.graphql'
import { Grid } from '@material-ui/core'
import React from 'react'

import ArtistCard from '../ArtistCard'
import useStyles from './styles'

interface ArtistsGridProps {
  artists?: Artist[]
}

const ArtistsGrid: React.FC<ArtistsGridProps> = ({ artists }) => {
  const classes = useStyles()
  console.log({ artists })
  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center">
      <Grid item xs={12}>
        <Grid container justify="center" className={classes.inner}>
          {artists &&
            artists.map((artist) => (
              <Grid key={artist?.id} item xs={5}>
                <ArtistCard artist={artist} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ArtistsGrid
