/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 23 2020
 * @ Time: 12:09
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    textAlign: 'center',
    marginTop: 'auto',
    background: theme.palette.primary.main,
    color: '#fff',
  },
}))

export default useStyles
