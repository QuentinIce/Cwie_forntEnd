import Grid from '@mui/material/Grid'
import { Box, Button, Card, CardContent, Tab, TextField, Typography } from '@mui/material'
import Icon from '@mdi/react'
import { mdiAccountMultiple } from '@mdi/js'
import { useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import axios from 'axios'

export default function supervisionEstabishment() {
  const intialSE = {
    su_need: '',
    su_time: '',
    su_detail: '',
    su_coor: '',
    su_date: '',
    su_sugges: ''
  }

  const [dataSupervisionEs, setDataSupervisionEs] = useState(intialSE)

  const colorSE = {
    su_need: false,
    su_time: false,
    su_detail: false,
    su_coor: false,
    su_date: false,
    su_sugges: false
  }

  const [colorChangeES, setColorChangeES] = useState(colorSE)

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const HandleOnChangeSE = (event, type) => {
    if (type === 'su_need') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionEs.su_need !== '') {
        setColorChangeES(pre => ({ ...pre, su_need: false }))
      }
      setDataSupervisionEs(pre => ({ ...pre, su_need: newStr }))
    } else if (type === 'su_time') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionEs.su_time !== '') {
        setColorChangeES(pre => ({ ...pre, su_time: false }))
      }
      setDataSupervisionEs(pre => ({ ...pre, su_time: newStr }))
    } else if (type === 'su_detail') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionEs.su_detail !== '') {
        setColorChangeES(pre => ({ ...pre, su_detail: false }))
      }
      setDataSupervisionEs(pre => ({ ...pre, su_detail: newStr }))
    } else if (type === 'su_coor') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionEs.su_coor !== '') {
        setColorChangeES(pre => ({ ...pre, su_coor: false }))
      }
      setDataSupervisionEs(pre => ({ ...pre, su_coor: newStr }))
    } else if (type === 'su_date') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionEs.su_date !== '') {
        setColorChangeES(pre => ({ ...pre, su_date: false }))
      }
      setDataSupervisionEs(pre => ({ ...pre, su_date: newStr }))
    } else if (type === 'su_sugges') {
      const newStr = event.target.value.replace('', '')
      if (dataSupervisionEs.su_sugges !== '') {
        setColorChangeES(pre => ({ ...pre, su_sugges: false }))
      }
      setDataSupervisionEs(pre => ({ ...pre, su_sugges: newStr }))
    }
  }

  const HandleOnInsertSE = () => {
    if (
      dataSupervisionEs.su_need !== '' &&
      dataSupervisionEs.su_time !== '' &&
      dataSupervisionEs.su_detail !== '' &&
      dataSupervisionEs.su_coor !== '' &&
      dataSupervisionEs.su_date !== '' &&
      dataSupervisionEs.su_sugges !== ''
    ) {
      setDataSupervisionEs(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataSupervisionEs // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      axios
        .post('http://localhost:3200/api/v1/supervisioncominsert', dataSupervisionEs)
        .then(res => {
          console.log(res)
          setDataSupervisionEs(intialSE)
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataSupervisionEs.su_need !== '') {
      console.log('su_need ไม่ว่าง')
    } else {
      console.log('su_need ว่าง')
      setColorChangeES(pre => ({ ...pre, su_need: true }))
    }
    if (dataSupervisionEs.su_time !== '') {
      console.log('su_time ไม่ว่าง')
    } else {
      console.log('su_time ว่าง')
      setColorChangeES(pre => ({ ...pre, su_time: true }))
    }
    if (dataSupervisionEs.su_detail !== '') {
      console.log('su_detail ไม่ว่าง')
    } else {
      console.log('su_detail ว่าง')
      setColorChangeES(pre => ({ ...pre, su_detail: true }))
    }
    if (dataSupervisionEs.su_date !== '') {
      console.log('su_date ไม่ว่าง')
    } else {
      console.log('su_date ว่าง')
      setColorChangeES(pre => ({ ...pre, su_date: true }))
    }
    if (dataSupervisionEs.su_coor !== '') {
      console.log('su_coor ไม่ว่าง')
    } else {
      console.log('su_coor ว่าง')
      setColorChangeES(pre => ({ ...pre, su_coor: true }))
    }
    if (dataSupervisionEs.su_sugges !== '') {
      console.log('su_sugges ไม่ว่าง')
    } else {
      console.log('su_sugges ว่าง')
      setColorChangeES(pre => ({ ...pre, su_sugges: true }))
    }
  }

  useEffect(() => {
    console.log(dataSupervisionEs)
  }, [dataSupervisionEs])

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
                  <Typography variant='h5'>Supervision Establishment</Typography>
                  <Typography variant='subtitle1'>Supervision Establishment</Typography>
                </Box>
              </Box>
              <TabContext value={value}>
                <TabList onChange={handleChange} aria-label='card navigation example'>
                  <Tab value='1' label='Supervision Establishment ' />
                </TabList>
                <CardContent>
                  <TabPanel value='1' sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mb: 14 }}>
                      <Typography variant='h4'>Supervision Establishment </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                      <Box sx={{ p: 3, width: '20%' }}>
                        <Typography variant='h6'>Need more interns </Typography>
                      </Box>
                      <Box sx={{ width: '35%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Interns'
                            placeholder='1'
                            onChange={event => HandleOnChangeSE(event, 'su_need')}
                            error={colorChangeES.su_need}
                            value={dataSupervisionEs.su_need}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 3, width: '20%' }}>
                        <Typography variant='h6'>Time supervision </Typography>
                      </Box>
                      <Box sx={{ width: '35%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Time'
                            placeholder='1'
                            onChange={event => HandleOnChangeSE(event, 'su_time')}
                            error={colorChangeES.su_time}
                            value={dataSupervisionEs.su_time}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <Box sx={{ p: 3 }}>
                        <Typography variant='h6'>How to apply and interview interns</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: '100%', mb: 6 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label='interview interns'
                          placeholder='interview interns'
                          multiline
                          minRows={3}
                          onChange={event => HandleOnChangeSE(event, 'su_detail')}
                          error={colorChangeES.su_detail}
                          value={dataSupervisionEs.su_detail}
                        />
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <Box sx={{ p: 3, width: '20%' }}>
                        <Typography variant='h6'>Contact coordinator</Typography>
                      </Box>
                      <Box sx={{ width: '35%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Contact coordinator'
                            placeholder='Contact coordinator'
                            onChange={event => HandleOnChangeSE(event, 'su_coor')}
                            error={colorChangeES.su_coor}
                            value={dataSupervisionEs.su_coor}
                          />
                        </Grid>
                      </Box>
                      <Box sx={{ p: 3, width: '15%' }}>
                        <Typography variant='h6'>Validity period </Typography>
                      </Box>
                      <Box sx={{ width: '32%' }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label='Validity period'
                            placeholder='3 Day'
                            onChange={event => HandleOnChangeSE(event, 'su_date')}
                            error={colorChangeES.su_date}
                            value={dataSupervisionEs.su_date}
                          />
                        </Grid>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <Box sx={{ p: 3 }}>
                        <Typography variant='h6'>Suggestions </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: '100%', mb: 6 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label='Suggestions'
                          placeholder='Suggestions'
                          multiline
                          minRows={3}
                          onChange={event => HandleOnChangeSE(event, 'su_sugges')}
                          error={colorChangeES.su_sugges}
                          value={dataSupervisionEs.su_sugges}
                        />
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mb: 6 }}>
                      <Button onClick={() => HandleOnInsertSE()}>submit</Button>
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
