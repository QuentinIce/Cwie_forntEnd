import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import Icon from '@mdi/react'
import { mdiPoll } from '@mdi/js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import { DailyReport, MonthlyReport, YearReport } from './DummyDay/dailyReport'

const Report_weeklyStudent = () => {
  const dropDown = {
    DailyReport: DailyReport,
    MonthlyReport: MonthlyReport,
    YearReport: YearReport
  }

  const jwtUsername = Cookies.get('._jwtUsername')
  const jwtRole = Cookies.get('._jwtRole')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [studentData, setStudentData] = useState('')
  const [resetData, setResetData] = useState({})

  useEffect(() => {
    axios
      .post('http://localhost:3200/api/verify_authen', {
        token: jwtUsername,
        tokenRole: jwtRole
      })
      .then(data => {
        setUsername(data.data.User)
        setStatus(data.data.stateRole)
      })
  }, [])

  useEffect(() => {
    if (username !== undefined && status !== undefined) {
      if (status === 'นักศึกษา') {
        axios.post('http://localhost:3200/api/ReadStudent', { username: username }).then(data => {
          if (data.data.length > 0) {
            setStudentData(data.data[0])
          }
        })
      }
    }
  }, [username, status])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setReportData(resetData)
    setColoChangeReport(colorReport)
  }

  useEffect(() => {
    const dataSetup = {
      re_hname: '',
      re_week: '',
      re_details: '',
      Id: studentData.Id,
      com_id: ''
    }
    setReportData(dataSetup)
    setResetData(dataSetup)
  }, [studentData])

  const [reportData, setReportData] = useState({})

  const colorReport = {
    re_hname: false,
    re_week: false,
    re_details: false,
    com_id: 'false'
  }

  const [colorChangeReport, setColoChangeReport] = useState(colorReport)

  const HandleOnChangeReport = (event, type) => {
    if (type === 're_hname') {
      const newStr = event.target.value.replace('', '')
      if (reportData.re_hname !== '') {
        setColoChangeReport(pre => ({ ...pre, re_hname: false }))
      }
      setReportData(pre => ({ ...pre, re_hname: newStr }))
    } else if (type === 're_week') {
      const newStr = event.target.value.replace('', '')
      if (reportData.re_week !== '') {
        setColoChangeReport(pre => ({ ...pre, re_week: false }))
      }
      setReportData(pre => ({ ...pre, re_week: newStr }))
    } else if (type === 're_details') {
      const newStr = event.target.value.replace('', '')
      if (reportData.re_details !== '') {
        setColoChangeReport(pre => ({ ...pre, re_details: false }))
      }
      setReportData(pre => ({ ...pre, re_details: newStr }))
    } else if (type === 'com_id') {
      const newStr = event.target.value
      if (reportData.com_id !== '') {
        setColoChangeReport(pre => ({ ...pre, com_id: false }))
      }
      setReportData(pre => ({ ...pre, com_id: newStr }))
    }
  }

  const [dataCompany, setDataCompany] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3200/api/v1/companys').then(res => {
      setDataCompany(res.data.data)
    })
  }, [])

  const handleOnInsertReport = () => {
    if (
      reportData.re_hname !== '' &&
      reportData.re_week !== '' &&
      reportData.re_details !== '' &&
      reportData.com_id !== ''
    ) {
      setReportData(pre => ({
        ...pre,
        ...reportData
      }))
    }
    axios.post('http://localhost:3200/api/v1/insertreport', reportData).then(res => {
      window.location.reload()
      handleClose()
      setReportData(resetData)
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 1
  }

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', display: 'flex', mb: 6 }}>
                <Box>
                  <Icon path={mdiPoll} size={6} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mt: 6 }}>
                  <Typography variant='h5'>Report Week</Typography>
                  <Typography variant='subtitle1'>Weekly work report of computer engineering students</Typography>
                </Box>
              </Box>
              <Box>
                <Button onClick={handleOpen}>Insert</Button>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}>
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ mb: 6 }}>
                      Add New Report Weekly
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ p: 4, mt: 4 }} variant='h6'>
                        Day
                      </Typography>
                      <FormControl variant='outlined' sx={{ my: 4, width: 100 }}>
                        <InputLabel id='Daily'>Daily</InputLabel>
                        <Select required labelId='Daily' id='Daily' name='Daily' label='Daily'>
                          {dropDown.DailyReport?.map(row => (
                            <MenuItem key={row.id} value={row.id}>
                              {row.day}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', ml: 8 }}>
                      <Typography sx={{ p: 4, mt: 4 }} variant='h6'>
                        Month
                      </Typography>
                      <FormControl variant='outlined' sx={{ my: 4, width: 150 }}>
                        <InputLabel id='Daily'>Month</InputLabel>
                        <Select required labelId='Daily' id='Daily' name='Daily' label='Daily'>
                          {dropDown.MonthlyReport?.map(row => (
                            <MenuItem key={row.id} value={row.id}>
                              {row.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', ml: 8 }}>
                      <Typography sx={{ p: 4, mt: 4 }} variant='h6'>
                        Year
                      </Typography>
                      <FormControl variant='outlined' sx={{ my: 4, width: 100 }}>
                        <InputLabel id='Daily'>Year</InputLabel>
                        <Select required labelId='Daily' id='Daily' name='Daily' label='Daily'>
                          {dropDown.YearReport?.map(row => (
                            <MenuItem key={row.id} value={row.id}>
                              {row.year}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 6 }}>
                    <Box sx={{ p: 4 }}>
                      <Typography variant='h6'>Topic Report detail </Typography>
                    </Box>
                    <Box>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label='Report'
                            placeholder='Report'
                            multiline
                            onChange={event => HandleOnChangeReport(event, 're_hname')}
                            error={colorChangeReport.re_hname}
                            value={reportData.re_hname}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ p: 4 }}>
                      <Typography>Week </Typography>
                    </Box>
                    <Box>
                      <TextField
                        fullWidth
                        label='week'
                        placeholder='1'
                        sx={{ width: 100 }}
                        onChange={event => HandleOnChangeReport(event, 're_week')}
                        error={colorChangeReport.re_week}
                        value={reportData.re_week}
                      />
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
                            onChange={event => HandleOnChangeReport(event, 're_details')}
                            error={colorChangeReport.re_details}
                            value={reportData.re_details}
                          />
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                  <Box sx={{ width: '80%' }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='h6'>Company:</Typography>
                      <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                        <InputLabel id='dataCompany-label'>Company:</InputLabel>
                        <Select
                          required
                          labelId='dataCompany-label'
                          id='dataCompany'
                          name='dataCompany'
                          label='dataCompany'
                          onChange={event => HandleOnChangeReport(event, 'com_id')}
                          value={dataCompany.com_nam}
                        >
                          {dataCompany?.map(row => (
                            <MenuItem key={row.com_id} value={row.com_id}>
                              {row.com_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button onClick={() => handleOnInsertReport()}>submit</Button>
                    <Button
                      onClick={() => {
                        handleClose(false)
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Modal>
              {/* <Box>{DataGrid Map filter id }</Box> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Report_weeklyStudent
