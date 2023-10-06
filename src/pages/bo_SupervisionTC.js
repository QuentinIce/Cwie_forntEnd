import Grid from '@mui/material/Grid'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import Icon from '@mdi/react'
import { mdiAccountMultiple } from '@mdi/js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

export default function Bo_SupervisionTC() {
  const [dataRowSuperES, setDataRowSuperES] = useState([])

  const column = [
    { field: 'tea_name', headerName: 'Teacher Name', width: 150 },
    { field: 'tea_lname', headerName: 'Teacher Last Name', width: 150 },
    { field: 'com_name', headerName: 'Company', width: 150 },
    { field: 'su_day', headerName: 'Day', width: 150 },
    { field: 'su_mon', headerName: 'Month ', width: 150 },
    { field: 'su_year', headerName: 'Year', width: 150 },
    { field: 'su_daparment', headerName: 'Department', width: 150 },
    { field: 'su_mname', headerName: 'Manager Name ', width: 150 },
    { field: 'su_job', headerName: 'Job position', width: 150 },
    { field: 'su_numstu', headerName: 'Student amount', width: 150 },
    { field: 'su_sugges', headerName: 'comments', width: 150 }
  ]

  useEffect(() => {
    axios.get('http://10.21.45.100:3000/api/v1/supervisiontea').then(res => {
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
                  <Typography variant='h5'>Supervision Teacher Show</Typography>
                  <Typography variant='subtitle1'>Supervision Teacher Show</Typography>
                </Box>
              </Box>
              <Box>
                <DataGrid rows={dataRowSuperES} columns={column} getRowId={row => row.su_teaid} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
