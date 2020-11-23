/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 23 2020
 * @ Time: 15:12
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  text: {
    margin: `${theme.spacing(2)}px 0`,
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  container: {
    '&:hover': {
      background: '#f2f3f4',
    },
  },
}))

export default useStyles
