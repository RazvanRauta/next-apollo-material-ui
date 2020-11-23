/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 23 2020
 * @ Time: 15:12
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 370,
    width: '100%',
    border: '1px solid transparent',
    '&:hover': {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  picture: {
    height: '100%',
    width: '100%',
  },
  longBio: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: 5,
  },
  cardLink: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))

export default useStyles
