/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 15:37
 */

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import Error from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { useArtistQuery } from '@/graphQL/Artist.graphql'
import Artist from '@/models/Artist'

import ArtworksGrid from '../ArtworksGrid'
import TabPanel from '../TabPanel'
import useStyles from './styles'

const a11yProps = (index: any) => {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  }
}

const ArtistComponent: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const [showMore, setShowMore] = useState(false)
  const [tabValue, setTabValue] = useState('artworks')

  const { data, error, loading } = useArtistQuery({
    variables: {
      // @ts-ignore
      artistId: parseInt(router.query.id),
    },
  })

  if (error) return <Error statusCode={500} />

  if (loading || router.isFallback || !data)
    return (
      <Box>
        Loading... <CircularProgress color="secondary" />
      </Box>
    )

  const { artist } = data

  const artistData = artist ? new Artist({ ...artist }) : null

  const handleTabChange = (
    _: React.ChangeEvent<Record<string, unknown>>,
    newValue: string,
  ) => {
    setTabValue(newValue)
  }

  return artistData ? (
    <>
      <Head>
        <title>{artistData?.name}</title>
      </Head>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="flex-start">
          <Box mr={2}>
            <img
              className={classes.image}
              alt={artistData?.name || 'Unknown artist'}
              src={
                artistData?.photo?.originalUrl ??
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/500px-Placeholder_no_text.svg.png'
              }
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography gutterBottom variant="h5">
              {artistData?.name}
            </Typography>
            <Typography variant="subtitle1">{artistData?.bio}</Typography>
            {artistData?.longBio && (
              <Typography
                className={
                  showMore
                    ? clsx(classes.longBio, classes.longBioShowMore)
                    : classes.longBio
                }
                variant="body2">
                {artistData?.longBio}
              </Typography>
            )}
            {artistData?.longBio && (
              <Box mb={2}>
                <Button
                  color="secondary"
                  onClick={() => setShowMore((prev) => !prev)}>
                  {showMore ? 'Show Less' : 'Show More'}
                </Button>
              </Box>
            )}
            <Typography variant="body1">{`${artistData?.lotsCount} lots, ${artistData?.artworksCount} artworks`}</Typography>
          </Box>
        </Box>
        <Box mt={10}>
          <AppBar
            position="static"
            color="transparent"
            className={classes.appBar}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="tabs label">
              <Tab
                value="artworks"
                label="ARTWORKS"
                {...a11yProps('artworks')}
              />
              <Tab
                value="analytics"
                label="ANALYTICS"
                {...a11yProps('analytics')}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={tabValue} index="artworks">
            <ArtworksGrid
              artistId={artistData?.id}
              artworksTotal={artistData?.artworksCount}
            />
          </TabPanel>
          <TabPanel value={tabValue} index="analytics">
            Analytics
          </TabPanel>
        </Box>
      </Box>
    </>
  ) : (
    <Box>
      <Typography variant="h4">Not found</Typography>
    </Box>
  )
}

export default ArtistComponent
