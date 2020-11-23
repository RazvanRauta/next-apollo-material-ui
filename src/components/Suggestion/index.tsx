/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 20:14
 */

import { Box, Link, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'

import useStyles from './styles'

interface Props {
  name: string | null
  id: number | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Suggestion: React.FC<Props> = ({ name, id, setOpen }) => {
  const classes = useStyles()
  return (
    <Box
      my={2}
      px={2}
      className={classes.container}
      maxWidth={300}
      onClick={() => setOpen(true)}>
      <NextLink href={`/artist/${id}`} passHref>
        <Link className={classes.link}>
          <Typography className={classes.text} variant="subtitle1">
            {name}
          </Typography>
        </Link>
      </NextLink>
    </Box>
  )
}

export default Suggestion
