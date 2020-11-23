/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 12:04
 */

import { Link, Toolbar, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import { Fragment } from 'react'

import useStyles from './styles'

const Header: React.FC = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <NextLink href="/" passHref>
          <Link className={classes.titleLink}>
            <Typography
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}>
              Next, Apollo, Material-Ui
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </Fragment>
  )
}

export default Header
