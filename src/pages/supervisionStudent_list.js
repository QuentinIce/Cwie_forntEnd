import Grid from '@mui/material/Grid'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import Icon from '@mdi/react'
import { mdiAccountMultiple } from '@mdi/js'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

export default function SupervisionStudent_list() {
  const column = [
    { field: 'stu_id', headerName: 'ID', width: 150 },
    { field: 'stu_name', headerName: 'Name', width: 150 },
    { field: 'stu_lname', headerName: 'Last Name', width: 150 },
    { field: 'su_timein', headerName: 'Time in ', width: 150 },
    { field: 'su_timeout', headerName: 'Time Out', width: 150 },
    { field: 'su_holiday', headerName: 'weekly holiday', width: 150 },
    { field: 'su_time', headerName: 'Time supervision ', width: 150 },
    { field: 'su_work', headerName: '  Nature of work ', width: 150 },
    { field: 'su_sugges', headerName: 'Suggestions', width: 300 }
  ]
  const [dataRowSuperSt, setDataRowSuperSt] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/supervisionstu')
      .then(res => {
        setDataRowSuperSt(res.data.data)
      })
      .catch(err => {
        console.log(err)
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
                  <Typography variant='h5'>Supervision Student List</Typography>
                  <Typography variant='subtitle1'>Supervision Student List</Typography>
                </Box>
              </Box>
              <Box>
                <DataGrid rows={dataRowSuperSt} columns={column} getRowId={row => row.su_stuid} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
