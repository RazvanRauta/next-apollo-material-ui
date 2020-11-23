/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 23 2020
 * @ Time: 13:29
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  inner: {
    gap: theme.spacing(2),
  },
}))

export default useStyles
