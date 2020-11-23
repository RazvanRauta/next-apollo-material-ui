/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 23 2020
 * @ Time: 16:00
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  longBio: {
    margin: `${theme.spacing(2)}px 0`,
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  longBioShowMore: {
    '-webkit-line-clamp': 'unset',
  },
  appBar: {
    boxShadow: 'none',
  },
}))

export default useStyles
