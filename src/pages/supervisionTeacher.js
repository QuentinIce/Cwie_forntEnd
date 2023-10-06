import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useEffect, useState } from 'react'
import Icon from '@mdi/react'
import { mdiFileDocumentCheckOutline } from '@mdi/js'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function SupervisionTeacher() {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [teacherData, setTeacherData] = useState('')
  const jwtUsername = Cookies.get('jwtUsername')
  const jwtRole = Cookies.get('jwtRole')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [resetData, setResetData] = useState({})

  useEffect(() => {
    const dataSetup = {
      su_day: '',
      su_mon: '',
      su_year: '',
      su_time: '',
      su_daparment: '',
      su_mname: '',
      su_job: '',
      su_numstu: '',
      su_sugges: '',
      tea_id: teacherData.tea_id,
      com_id: ''
    }
    setDataSupervisionTc(dataSetup)
    setResetData(dataSetup)
  }, [teacherData])

  const colorST = {
    su_day: false,
    su_mon: false,
    su_year: false,
    su_time: false,
    su_daparment: false,
    su_mname: false,
    su_job: false,
    su_numstu: false,
    su_sugges: false,
    com_id: false
  }

  const [dataSupervisionTc, setDataSupervisionTc] = useState({})
  const [colorSupervision, setColorSupervision] = useState(colorST)

  useEffect(() => {
    axios
      .post('http://10.21.45.100:3000/api/verify_authen', {
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
    axios.get('http://10.21.45.100:3000/api/v1/companys').then(res => {
      setDataCompany(res.data.data)
    })
  }, [])

  useEffect(() => {
    if (status === 'อาจารย์') {
      axios.post('http://10.21.45.100:3000/api/ReadTeacher', { username: username }).then(data => {
        if (data.data.length > 0) {
          setTeacherData(data.data[0])
        }
      })
    }
  }, [username, status])

  const HandleOnChangeSE = (event, type) => {
    if (type === 'su_day') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_day !== '') {
        setColorSupervision(pre => ({ ...pre, su_day: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_day: newStr }))
    } else if (type === 'su_mon') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_mon !== '') {
        setColorSupervision(pre => ({ ...pre, su_mon: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_mon: newStr }))
    } else if (type === 'su_year') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_year !== '') {
        setColorSupervision(pre => ({ ...pre, su_year: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_year: newStr }))
    } else if (type === 'su_time') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_time !== '') {
        setColorSupervision(pre => ({ ...pre, su_time: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_time: newStr }))
    } else if (type === 'su_daparment') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_daparment !== '') {
        setColorSupervision(pre => ({ ...pre, su_daparment: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_daparment: newStr }))
    } else if (type === 'su_mname') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_mname !== '') {
        setColorSupervision(pre => ({ ...pre, su_mname: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_mname: newStr }))
    } else if (type === 'su_job') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_job !== '') {
        setColorSupervision(pre => ({ ...pre, su_job: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_job: newStr }))
    } else if (type === 'su_numstu') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_numstu !== '') {
        setColorSupervision(pre => ({ ...pre, su_numstu: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_numstu: newStr }))
    } else if (type === 'su_sugges') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionTc.su_sugges !== '') {
        setColorSupervision(pre => ({ ...pre, su_sugges: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, su_sugges: newStr }))
    } else if (type === 'com_id') {
      const newStr = event.target.value
      if (dataSupervisionTc.com_id !== '') {
        setColorSupervision(pre => ({ ...pre, com_id: false }))
      }
      setDataSupervisionTc(pre => ({ ...pre, com_id: newStr }))
    }
  }

  const HandleInsertTc = () => {
    if (
      dataSupervisionTc.su_day !== '' &&
      dataSupervisionTc.su_mon !== '' &&
      dataSupervisionTc.su_year !== '' &&
      dataSupervisionTc.su_time !== '' &&
      dataSupervisionTc.su_daparment !== '' &&
      dataSupervisionTc.su_mname !== '' &&
      dataSupervisionTc.su_job !== '' &&
      dataSupervisionTc.su_numstu !== '' &&
      dataSupervisionTc.su_sugges !== ''
    ) {
      setDataSupervisionTc(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataSupervisionTc // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      axios
        .post('http://10.21.45.100:3000/api/v1/supervisionteainsert', dataSupervisionTc)
        .then(res => {
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataSupervisionTc.su_day !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_day: true }))
    }
    if (dataSupervisionTc.su_mon !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_mon: true }))
    }
    if (dataSupervisionTc.su_year !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_year: true }))
    }
    if (dataSupervisionTc.su_time !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_time: true }))
    }
    if (dataSupervisionTc.su_daparment !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_daparment: true }))
    }
    if (dataSupervisionTc.su_time !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_time: true }))
    }
    if (dataSupervisionTc.su_mname !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_mname: true }))
    }
    if (dataSupervisionTc.su_job !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_job: true }))
    }
    if (dataSupervisionTc.su_numstu !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_numstu: true }))
    }
    if (dataSupervisionTc.su_sugges !== '') {
    } else {
      setColorSupervision(pre => ({ ...pre, su_sugges: true }))
    }
  }

  useEffect(() => {
    console.log(dataSupervisionTc)
  }, [dataSupervisionTc])

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', width: '100%', my: 6 }}>
                <Box>
                  <Icon path={mdiFileDocumentCheckOutline} size={6} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h4'> Supervision for Teacher</Typography>
                  <Typography variant='subtitle1'> Supervision</Typography>
                </Box>
              </Box>
              <TabContext value={value}>
                <TabList onChange={handleChange} aria-label='card navigation example'>
                  <Tab value='1' label='Supervision Teacher' />
                </TabList>
                <CardContent>
                  <TabPanel value='1' sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mb: 14 }}>
                      <Typography variant='h4'>Supervision Teacher</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <Box sx={{ p: 4 }}>
                        <Typography>Day:</Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Day'
                            placeholder='1'
                            onChange={event => HandleOnChangeSE(event, 'su_day')}
                            error={colorSupervision.su_day}
                            value={dataSupervisionTc.su_day}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 4 }}>
                        <Typography>Month</Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Month'
                            placeholder='6'
                            onChange={event => HandleOnChangeSE(event, 'su_mon')}
                            error={colorSupervision.su_mon}
                            value={dataSupervisionTc.su_mon}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 4 }}>
                        <Typography>Year:</Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Year'
                            placeholder='2566'
                            onChange={event => HandleOnChangeSE(event, 'su_year')}
                            error={colorSupervision.su_year}
                            value={dataSupervisionTc.su_year}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 6, display: 'flex', flexDirection: 'row' }}>
                      <Box sx={{ p: 4 }}>
                        <Typography>Time</Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Time'
                            placeholder='08.00'
                            onChange={event => HandleOnChangeSE(event, 'su_time')}
                            error={colorSupervision.su_time}
                            value={dataSupervisionTc.su_time}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 4, ml: 20 }}>
                        <Typography>Department</Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            label='Department'
                            placeholder=''
                            onChange={event => HandleOnChangeSE(event, 'su_daparment')}
                            error={colorSupervision.su_daparment}
                            value={dataSupervisionTc.su_daparment}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 6, display: 'flex', flexDirection: 'row' }}>
                      <Box sx={{ p: 4 }}>
                        <Typography>Name Manager</Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            label='Name Manager'
                            placeholder=''
                            onChange={event => HandleOnChangeSE(event, 'su_mname')}
                            error={colorSupervision.su_mname}
                            value={dataSupervisionTc.su_mname}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 4 }}>
                        <Typography>Job position</Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            label='Job position'
                            placeholder=''
                            onChange={event => HandleOnChangeSE(event, 'su_job')}
                            error={colorSupervision.su_job}
                            value={dataSupervisionTc.su_job}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 6, display: 'flex', flexDirection: 'row' }}>
                      <Box sx={{ p: 4 }}>
                        <Typography>Number of students</Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            label='Number of students'
                            placeholder='1'
                            onChange={event => HandleOnChangeSE(event, 'su_numstu')}
                            error={colorSupervision.su_numstu}
                            value={dataSupervisionTc.su_numstu}
                          />
                        </Grid>
                      </Box>
                    </Box>
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
                            onChange={event => HandleOnChangeSE(event, 'com_id')}
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
                    <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ p: 4 }}>
                        <Typography>Teacher's comments</Typography>
                      </Box>
                      <Box sx={{ width: '100%' }}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label='Teacher comments'
                            placeholder='Teacher comments'
                            multiline
                            minRows={6}
                            onChange={event => HandleOnChangeSE(event, 'su_sugges')}
                            error={colorSupervision.su_sugges}
                            value={dataSupervisionTc.su_sugges}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 6 }}>
                      <Button onClick={() => HandleInsertTc()}>submit</Button>
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
