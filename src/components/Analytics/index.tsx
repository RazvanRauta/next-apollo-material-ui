/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 20:55
 */

import {
  CompoundAnnualDocument,
  CompoundAnnualQuery,
} from '__generated__/src/graphQL/CompoundAnnualReturns.graphql'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { request } from 'graphql-request'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import React, { useEffect, useState } from 'react'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

interface AnalyticsProps {
  artistId: number | null | undefined
}

const Analytics: React.FC<AnalyticsProps> = ({ artistId }) => {
  const [loading, setLoading] = useState(false)
  const [chartOptions, setChartOptions] = useState<Record<
    string,
    unknown
  > | null>(null)

  const getChartData = async () => {
    setLoading(true)
    const categories: number[] = []
    const datum: number[] = []
    try {
      const data = await request<CompoundAnnualQuery>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        CompoundAnnualDocument,
        { artistId }, //hardcoded because some bug on backend
      )
      const { compoundAnnualReturns } = data
      if (compoundAnnualReturns) {
        compoundAnnualReturns.forEach((data) => {
          if (data && data?.date) {
            categories.push(new Date(data?.date).getFullYear())
          }
          if (data && data?.car) {
            datum.push(data?.car)
          }
        })

        setChartOptions((prev) => ({
          ...prev,

          chart: {
            type: 'column',
          },
          series: [{ name: 'Median CAR(%)', data: [...datum] }],
          xAxis: {
            categories,
            type: 'category',
          },
          title: {
            text: 'Median Realized Compound Annual Returns (CAR)',
          },
          legend: {
            enabled: false,
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%',
              },
            },
          },
          tooltip: {
            headerFormat:
              '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:
              '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
          },
        }))
      } else {
        setChartOptions(null)
      }
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !loading && chartOptions ? (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  ) : loading ? (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      mt={4}>
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      mt={4}>
      <Typography>No Data Available</Typography>
    </Box>
  )
}

export default Analytics
