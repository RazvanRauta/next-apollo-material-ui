/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 23 2020
 * @ Time: 17:05
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  inner: {
    gap: theme.spacing(2),
    gridAutoRows: '1fr',
  },
  image: {
    height: '270px',
    width: '264px',
    objectFit: 'cover',
  },
  artworkCard: {
    width: '100%',
    height: '100%',
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}))

export default useStyles
