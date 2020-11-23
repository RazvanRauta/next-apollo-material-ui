/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 15:10
 */

import { Grid, Link, Paper, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'

import Artist from '@/models/Artist'

import useStyles from './styles'

interface ArtistCardProps {
  artist?: Artist
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const classes = useStyles()

  return (
    <NextLink href={`/artist/${artist?.id}`} passHref>
      <Link className={classes.cardLink}>
        <Paper className={classes.paper}>
          <Grid container justify="center" style={{ gap: 10 }}>
            <Grid item xs>
              {artist?.photo && (
                <img
                  className={classes.picture}
                  alt={artist?.name || 'Unknown artist'}
                  src={
                    artist?.photo?.originalUrl ??
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/500px-Placeholder_no_text.svg.png'
                  }
                />
              )}
            </Grid>
            <Grid item xs>
              <Typography gutterBottom variant="h5">
                {artist?.name}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                {artist?.bio}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.longBio}>
                {artist?.longBio}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </NextLink>
  )
}

export default ArtistCard
