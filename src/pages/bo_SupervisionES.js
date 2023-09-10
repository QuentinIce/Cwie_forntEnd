import Grid from '@mui/material/Grid'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import Icon from '@mdi/react'
import { mdiAccountMultiple } from '@mdi/js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

export default function bo_SupervisionES() {
  const [dataRowSuperES, setDataRowSuperES] = useState('')

  const column = [
    { field: 'su_need', headerName: 'Need more interns', width: 150 },
    { field: 'su_time', headerName: 'Time supervision ', width: 150 },
    { field: 'su_detail', headerName: 'interview interns', width: 150 },
    { field: 'su_coor', headerName: 'Contact coordinator', width: 150 },
    { field: 'su_date', headerName: 'Validity period ', width: 150 },
    { field: 'su_sugges', headerName: 'Suggestions', width: 300 }
  ]

  useEffect(() => {
    axios.get('http://localhost:3200/api/v1/supervisioncom').then(res => {
      setDataRowSuperES(res.data.data)
    })
  }, [])

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', display: 'flex', my: 6 }}>
                <Box>
                  <Icon path={mdiAccountMultiple} size={6} />
                </Box>
                <Box>
                  <Typography variant='h5'>Supervision Establishment Show</Typography>
                  <Typography variant='subtitle1'>Supervision Establishment Show</Typography>
                </Box>
              </Box>
              <Box>
                <DataGrid rows={dataRowSuperES} columns={column} getRowId={row => row.su_comid} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
