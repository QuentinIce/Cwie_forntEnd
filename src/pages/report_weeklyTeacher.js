import Grid from '@mui/material/Grid'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import Icon from '@mdi/react'
import { mdiChartBar } from '@mdi/js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { Modal } from '@mui/base'

export default function Report_weeklyTeacher() {
  const [rowReportStd, setRowReportStd] = useState([])
  const [getRow, setGetRow] = useState('')

  const [openReStd, setOpenReStd] = useState(false)
  const handleOpenReStd = () => setOpenReStd(true)
  const handleCloseReStd = () => setOpenReStd(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  }

  const columns = [
    { field: 'stu_id', headerName: 'Student ID', width: 200 },
    { field: 'stu_name', headerName: 'Student Name', width: 150 },
    { field: 'stu_lname', headerName: 'Student Last Name', width: 200 },
    { field: 're_week', headerName: 'Week', width: 150 },
    { field: 'com_name', headerName: 'Company', width: 150 },
    {
      field: 'SHOW',
      headerName: 'SHOW',
      width: 150,
      renderCell: (
        params //ทั้งหมดมี button edit
      ) => (
        <Button
          variant='text'
          onClick={() => {
            handleOpenReStd()
            console.log(params.row)
            setGetRow(params.row)
          }}
        >
          Show
        </Button>
      )
    }
  ]

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/getreport')
      .then(res => {
        setRowReportStd(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Box>
      <Modal
        open={openReStd}
        onClose={handleCloseReStd}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ mb: 6 }}>
              Add New Report Weekly
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Box sx={{ p: 6 }}>
              <Typography variant='h6'>Topic Report detail : </Typography>
            </Box>
            <Box>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Report'
                    placeholder='Report'
                    multiline
                    minRows={2}
                    sx={{ width: 500 }}
                    value={getRow.re_hname}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ p: 6 }}>
              <Typography>Week : </Typography>
            </Box>
            <Box>
              <TextField fullWidth label='week' placeholder='1' sx={{ width: 100, p: 2 }} value={getRow.re_week} />
            </Box>
          </Box>
          <Box sx={{ p: 6 }}>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h6'>Report detail</Typography>
            </Box>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Report'
                    placeholder='Report'
                    multiline
                    minRows={6}
                    value={getRow.re_details}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box sx={{ width: '100%', display: 'flex' }}>
            <Box sx={{ width: '32%', p: 4 }}>
              <Typography variant='h6'>Name Establishment:</Typography>
            </Box>
            <Box sx={{ width: '65%' }}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='Name Establishment' placeholder='Establishment' value={getRow.com_name} />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              onClick={() => {
                handleCloseReStd(false)
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', display: 'flex', my: 6 }}>
                <Box>
                  <Icon path={mdiChartBar} size={6} />
                </Box>
                <Box>
                  <Typography variant='h5'>Report Student</Typography>
                  <Typography variant='subtitle1'>Report Student</Typography>
                </Box>
              </Box>
            </CardContent>
            <Box>
              <DataGrid rows={rowReportStd} columns={columns} getRowId={row => row.re_id} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
