/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 12:03
 */

import { Container } from '@material-ui/core'
import React, { Fragment } from 'react'

import useStyles from './styles'

const Main: React.FC = ({ children }) => {
    const classes = useStyles()
    return (
        <Container component="main" className={classes.main} maxWidth="md">
            <Fragment>{children}</Fragment>
        </Container>
    )
}

export default Main
