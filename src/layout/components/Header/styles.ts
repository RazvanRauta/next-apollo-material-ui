/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 23 2020
 * @ Time: 12:06
 */

import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    padding: theme.spacing(3, 2),
    justifyContent: 'flex-start',
    background: theme.palette.primary.main,
  },
  toolbarTitle: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  titleLink: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  [theme.breakpoints.down('xs')]: {
    toolbarTitle: {
      fontSize: 20,
    },
  },
}))

export default useStyles
