/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 16:30
 */

import { Box, Typography } from '@material-ui/core'
import React from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default TabPanel
