import Grid from '@mui/material/Grid'
import { Box, Button, Card, CardContent, Typography, Select, FormControl, InputLabel, MenuItem } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import { useEffect, useState } from 'react'
import Icon from '@mdi/react'
import { mdiAccountGroup } from '@mdi/js'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function SupervisionStudent() {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const jwtUsername = Cookies.get('jwtUsername')
  const jwtRole = Cookies.get('jwtRole')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [studentData, setStudentData] = useState('')
  const [resetData, setResetData] = useState({})

  useEffect(() => {
    axios
      .post('http://localhost:3000/api/verify_authen', {
        token: jwtUsername,
        tokenRole: jwtRole
      })
      .then(data => {
        setUsername(data.data.User)
        setStatus(data.data.stateRole)
      })
  }, [jwtUsername, jwtRole])

  const [dataCompany, setDataCompany] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/companys').then(res => {
      setDataCompany(res.data.data)
    })
  }, [])

  useEffect(() => {
    if (username !== undefined && status !== undefined) {
      if (status === 'นักศึกษา') {
        axios.post('http://localhost:3000/api/ReadStudent', { username: username }).then(data => {
          if (data.data.length > 0) {
            setStudentData(data.data[0])
          }
        })
      }
    }
  }, [username, status])

  useEffect(() => {
    const dataSetup = {
      su_name: '',
      su_lname: '',
      su_timein: '',
      su_timeout: '',
      su_holiday: '',
      su_time: '',
      su_work: '',
      su_sugges: '',
      Id: studentData.Id,
      com_id: ''
    }
    setDataSt(dataSetup)
    setResetData(dataSetup)
  }, [studentData])

  const [dataSt, setDataSt] = useState({})

  const colorSt = {
    su_name: false,
    su_lname: false,
    su_timein: false,
    su_timeout: false,
    su_holiday: false,
    su_time: false,
    su_work: false,
    su_sugges: false,
    com_id: false
  }

  const [colorChangeSt, setColorChangeSt] = useState(colorSt)

  const HandleChangeSt = (event, type) => {
    if (type === 'su_name') {
      const newStr = event.target.value.replace('', '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataSt.su_name !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeSt(pre => ({ ...pre, su_name: false }))
      }
      setDataSt(pre => ({ ...pre, su_name: newStr }))
    } else if (type === 'su_lname') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.su_lname !== '') {
        setColorChangeSt(pre => ({ ...pre, su_lname: false }))
      }
      setDataSt(pre => ({ ...pre, su_lname: newStr }))
    } else if (type === 'su_timein') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.su_timein !== '') {
        setColorChangeSt(pre => ({ ...pre, su_timein: false }))
      }
      setDataSt(pre => ({ ...pre, su_timein: newStr }))
    } else if (type === 'su_timeout') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.su_timeout !== '') {
        setColorChangeSt(pre => ({ ...pre, su_timeout: false }))
      }
      setDataSt(pre => ({ ...pre, su_timeout: newStr }))
    } else if (type === 'su_holiday') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.su_holiday !== '') {
        setColorChangeSt(pre => ({ ...pre, su_holiday: false }))
      }
      setDataSt(pre => ({ ...pre, su_holiday: newStr }))
    } else if (type === 'su_time') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.su_time !== '') {
        setColorChangeSt(pre => ({ ...pre, su_time: false }))
      }
      setDataSt(pre => ({ ...pre, su_time: newStr }))
    } else if (type === 'su_work') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.su_work !== '') {
        setColorChangeSt(pre => ({ ...pre, su_work: false }))
      }
      setDataSt(pre => ({ ...pre, su_work: newStr }))
    } else if (type === 'su_sugges') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.su_sugges !== '') {
        setColorChangeSt(pre => ({ ...pre, su_sugges: false }))
      }
      setDataSt(pre => ({ ...pre, su_sugges: newStr }))
    } else if (type === 'com_id') {
      const newStr = event.target.value
      if (dataSt.com_id !== '') {
        setColorChangeSt(pre => ({ ...pre, com_id: false }))
      }
      setDataSt(pre => ({ ...pre, com_id: newStr }))
    }
  }

  const HandleInsertSt = () => {
    if (
      dataSt.su_name !== '' &&
      dataSt.su_lname !== '' &&
      dataSt.su_timein !== '' &&
      dataSt.su_timeout !== '' &&
      dataSt.su_holiday !== '' &&
      dataSt.su_time !== '' &&
      dataSt.su_work !== '' &&
      dataSt.su_sugges !== ''
    ) {
      setDataSt(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataSt // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      axios
        .post('http://localhost:3000/api/v1/supervisionstuinsert', dataSt)
        .then(res => {
          window.location.reload()
          setDataSt(intialSt)
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataSt.su_name !== '') {
    } else {
      setColorChangeSt(pre => ({ ...pre, su_name: true }))
    }
    if (dataSt.su_lname !== '') {
    } else {
      setColorChangeSt(pre => ({ ...pre, su_lname: true }))
    }
    if (dataSt.su_timein !== '') {
    } else {
      setColorChangeSt(pre => ({ ...pre, su_timein: true }))
    }
    if (dataSt.su_timeout !== '') {
    } else {
      setColorChangeSt(pre => ({ ...pre, su_timeout: true }))
    }
    if (dataSt.su_holiday !== '') {
    } else {
      setColorChangeSt(pre => ({ ...pre, su_holiday: true }))
    }
    if (dataSt.su_time !== '') {
    } else {
      setColorChangeSt(pre => ({ ...pre, su_time: true }))
    }
    if (dataSt.su_work !== '') {
    } else {
      setColorChangeSt(pre => ({ ...pre, su_work: true }))
    }
    if (dataSt.su_sugges !== '') {
    } else {
      setColorChangeSt(pre => ({ ...pre, su_sugges: true }))
    }
  }

  // useEffect(() => {
  //   console.log(dataSt)
  // }, [dataSt])

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', display: 'flex' }}>
                <Icon path={mdiAccountGroup} size={6} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h5'>Supervision Student </Typography>
                  <Typography variant='subtitle1'>Supervision of students is divided into 2 sessions.</Typography>
                </Box>
              </Box>
              <TabContext value={value}>
                <TabList onChange={handleChange} aria-label='card navigation example'>
                  <Tab value='1' label='Supervision Student' />
                </TabList>
                <CardContent>
                  <TabPanel value='1' sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mb: 14 }}>
                      <Typography variant='h4'>Supervision Student</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <Box sx={{ p: 3 }}>
                        <Typography variant='h6'>Name</Typography>
                      </Box>
                      <Box sx={{ width: '35%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Name'
                            placeholder='Name[TH]'
                            onChange={event => HandleChangeSt(event, 'su_name')}
                            error={colorChangeSt.su_name}
                            value={dataSt.su_name}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 3, ml: 20 }}>
                        <Typography variant='h6'>Last Name</Typography>
                      </Box>
                      <Box sx={{ width: '35%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Last Name'
                            placeholder='Last Name[TH]'
                            onChange={event => HandleChangeSt(event, 'su_lname')}
                            error={colorChangeSt.su_lname}
                            value={dataSt.su_lname}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 5 }}>
                      <Box sx={{ p: 3 }}>
                        <Typography variant='h6'>Time in</Typography>
                      </Box>
                      <Box sx={{ width: '20%' }}>
                        <Grid item xs={8}>
                          <TextField
                            fullWidth
                            label='Time in'
                            placeholder='8.00'
                            onChange={event => HandleChangeSt(event, 'su_timein')}
                            error={colorChangeSt.su_timein}
                            value={dataSt.su_timein}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 3, ml: 65 }}>
                        <Typography variant='h6'>Time Out</Typography>
                      </Box>
                      <Box sx={{ width: '20%', ml: 4 }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Time Out'
                            placeholder='17.00'
                            onChange={event => HandleChangeSt(event, 'su_timeout')}
                            error={colorChangeSt.su_timeout}
                            value={dataSt.su_timeout}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 5 }}>
                      <Box sx={{ p: 3 }}>
                        <Typography variant='h6'>weekly holiday</Typography>
                      </Box>
                      <Box sx={{ width: '20%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='weekly holiday'
                            placeholder='Saturday,Sunday'
                            onChange={event => HandleChangeSt(event, 'su_holiday')}
                            error={colorChangeSt.su_holiday}
                            value={dataSt.su_holiday}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 3, ml: 31 }}>
                        <Typography variant='h6'>Time supervision</Typography>
                      </Box>
                      <Box sx={{ width: '20%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Time supervision'
                            placeholder='1,2'
                            onChange={event => HandleChangeSt(event, 'su_time')}
                            error={colorChangeSt.su_time}
                            value={dataSt.su_time}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Grid item xs={12} sm={6}>
                          <Typography variant='h6' sx={{ p: 2 }}>
                            Company
                          </Typography>
                          <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                            <InputLabel id='dataCompany-label'>Company</InputLabel>
                            <Select
                              required
                              labelId='dataCompany-label'
                              id='dataCompany'
                              name='dataCompany'
                              label='dataCompany'
                              onChange={event => HandleChangeSt(event, 'com_id')}
                              value={dataCompany.com_name}
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

                      <Box>
                        <Typography variant='h6' sx={{ mt: 5, p: 3 }}>
                          Nature of work
                        </Typography>
                        <TextField
                          fullWidth
                          label='Nature of work'
                          placeholder='Nature of work'
                          multiline
                          minRows={6}
                          onChange={event => HandleChangeSt(event, 'su_work')}
                          error={colorChangeSt.su_work}
                          value={dataSt.su_work}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Typography variant='h6' sx={{ mt: 5, p: 3 }}>
                          Suggestion
                        </Typography>
                      </Box>
                      <Box>
                        <TextField
                          fullWidth
                          label='Suggestion'
                          placeholder='Suggestion'
                          multiline
                          minRows={6}
                          onChange={event => HandleChangeSt(event, 'su_sugges')}
                          error={colorChangeSt.su_sugges}
                          value={dataSt.su_sugges}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mb: 6 }}>
                      <Button onClick={() => HandleInsertSt()}>submit</Button>
                      <Button>Cancel</Button>
                    </Box>
                  </TabPanel>
                </CardContent>
              </TabContext>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
