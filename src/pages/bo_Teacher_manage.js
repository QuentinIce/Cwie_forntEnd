import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import Icon from '@mdi/react'
import { mdiAccountMultiple } from '@mdi/js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import Modal from '@mui/material/Modal'

export default function Bo_Teacher_manage() {
  const intialTea = {
    tea_name: '',
    tea_lname: '',
    tea_status: '',
    tea_tel: '',
    curriculum_id: '',
    studygroup_id: '',
    user: '',
    pass: ''
  }

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

  const [rowDataTeacher, setRowDataTeacher] = useState([])
  const [dataTeacher, setDataTeacher] = useState(intialTea)
  const [studyGroup, setStudyGroup] = useState([])
  const [curriculum, setCurriculum] = useState([])

  const [colorChangeTc, setColorChangeTc] = useState({
    tea_name: false,
    tea_lname: false,
    tea_status: false,
    tea_tel: false,
    curriculum_id: false,
    studygroup_id: false,
    user: false,
    pass: false
  })

  const [openTc, setOpenTc] = useState(false)
  const handleOpen = () => setOpenTc(true)

  const handleClose = () => {
    setOpenTc(false)
    setDataTeacher(intialTea)
    setColorChangeTc(false)
  }

  const [openEditTc, setOpenEditTc] = useState(false)
  const handleOpenEdit = () => setOpenEditTc(true)

  const handleCloseEdit = () => {
    setDataTeacher(intialTea)
    setOpenEditTc(false)
    setColorChangeTc(false)
  }

  const [getIdDelTc, setGetIdDelTc] = useState('')
  const [openDelTc, setOpenDelTc] = useState(false)
  const handleOpenDel = () => setOpenDelTc(true)

  const handleCloseDel = () => {
    setDataTeacher(intialTea)
    setOpenDelTc(false)
    setColorChangeTc(false)
  }

  const columns = [
    { field: 'tea_name', headerName: 'Name', width: 150 },
    { field: 'tea_lname', headerName: 'Last Name', width: 100 },
    { field: 'tea_status', headerName: 'Status', width: 120 },
    { field: 'tea_tel', headerName: 'Tel', width: 150 },
    { field: 'curriculum_name', headerName: 'curriculum', width: 150 },
    { field: 'studygroup_name', headerName: 'Study Group', width: 200 },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (
        params //ทั้งหมดมี button edit
      ) => (
        <Button
          variant='text'
          onClick={() => {
            setDataTeacher(params.row)
            handleOpenEdit()
          }}
        >
          Edit
        </Button>
      )
    },
    {
      field: 'Del',
      headerName: 'Del',
      width: 150,
      renderCell: (
        params //ทั้งหมดมี button edit
      ) => (
        <Button
          variant='text'
          onClick={() => {
            setGetIdDelTc(params.id)
            handleOpenDel()
          }}
        >
          Del
        </Button>
      )
    }
  ]

  useEffect(() => {
    axios.get('http://10.21.45.100:3000/api/v1/teachers').then(res => {
      setRowDataTeacher(res.data.data)
    })
    axios.post('http://10.21.45.100:3000/api/v1/studygroup').then(res => {
      setStudyGroup(res.data.results)
    })
    axios.post('http://10.21.45.100:3000/api/v1/curriculum').then(res => {
      setCurriculum(res.data.results)
    })
  }, [])

  const HandleChange = (event, type) => {
    if (type === 'tea_name') {
      const newStr = event.target.value.replace('', '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataTeacher.tea_name !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeTc(pre => ({ ...pre, tea_name: false }))
      }
      setDataTeacher(pre => ({ ...pre, tea_name: newStr }))
    } else if (type === 'tea_lname') {
      const newStr = event.target.value.replace('', '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataTeacher.tea_lname !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeTc(pre => ({ ...pre, tea_lname: false }))
      }
      setDataTeacher(pre => ({ ...pre, tea_lname: newStr }))
    } else if (type === 'tea_status') {
      const newStr = event.target.value.replace('', '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataTeacher.tea_status !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeTc(pre => ({ ...pre, tea_status: false }))
      }
      setDataTeacher(pre => ({ ...pre, tea_status: newStr }))
    } else if (type === 'tea_tel') {
      const newStr = event.target.value.replace(/[^\d.-]+/g, '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataTeacher.tea_tel !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeTc(pre => ({ ...pre, tea_tel: false }))
      }
      setDataTeacher(pre => ({ ...pre, tea_tel: newStr }))
    } else if (type === 'curriculum_id') {
      const newStr = event.target.value // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataTeacher.curriculum_id !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeTc(pre => ({ ...pre, curriculum_id: false }))
      }
      setDataTeacher(pre => ({ ...pre, curriculum_id: newStr }))
    } else if (type === 'studygroup_id') {
      const newStr = event.target.value // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataTeacher.studygroup_id !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeTc(pre => ({ ...pre, studygroup_id: false }))
      }
      setDataTeacher(pre => ({ ...pre, studygroup_id: newStr }))
    } else if (type === 'user') {
      const newStr = event.target.value // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataTeacher.user !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeTc(pre => ({ ...pre, user: false }))
      }
      setDataTeacher(pre => ({ ...pre, user: newStr }))
    } else if (type === 'pass') {
      const newStr = event.target.value // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataTeacher.pass !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColorChangeTc(pre => ({ ...pre, pass: false }))
      }
      setDataTeacher(pre => ({ ...pre, pass: newStr }))
    }
  }

  const HandleOnInsTc = () => {
    if (
      dataTeacher.tea_name !== '' &&
      dataTeacher.tea_lname !== '' &&
      dataTeacher.tea_status !== '' &&
      dataTeacher.studygroup_id !== '' &&
      dataTeacher.curriculum_id !== '' &&
      dataTeacher.tea_tel !== '' &&
      dataTeacher.user !== '' &&
      dataTeacher.pass !== ''
    ) {
      setDataTeacher(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataTeacher // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      axios
        .post('http://10.21.45.100:3000/api/v1/insertteacher', dataTeacher)
        .then(res => {
          console.log(res)
          window.location.reload()
          handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataTeacher.tea_name !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, tea_name: true }))
    }
    if (dataTeacher.tea_lname !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, tea_lname: true }))
    }
    if (dataTeacher.tea_status !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, tea_status: true }))
    }
    if (dataTeacher.tea_tel !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, tea_tel: true }))
    }
    if (dataTeacher.user !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, user: true }))
    }
    if (dataTeacher.pass !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, pass: true }))
    }
  }

  const HandleOnEditTc = () => {
    if (
      dataTeacher.tea_name !== '' &&
      dataTeacher.tea_lname !== '' &&
      dataTeacher.tea_status !== '' &&
      dataTeacher.studygroup_id !== '' &&
      dataTeacher.curriculum_id !== '' &&
      dataTeacher.tea_tel !== '' &&
      dataTeacher.user !== '' &&
      dataTeacher.pass !== ''
    ) {
      setDataTeacher(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataTeacher // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      axios
        .post('http://10.21.45.100:3000/api/v1/teacherupdate', dataTeacher)
        .then(res => {
          setDataTeacher(intialTea)
          window.location.reload()
          handleCloseEdit()
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataTeacher.tea_name !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, tea_name: true }))
    }
    if (dataTeacher.tea_lname !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, tea_lname: true }))
    }
    if (dataTeacher.tea_status !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, tea_status: true }))
    }
    if (dataTeacher.tea_tel !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, tea_tel: true }))
    }
    if (dataTeacher.user !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, user: true }))
    }
    if (dataTeacher.pass !== '') {
    } else {
      setColorChangeTc(pre => ({ ...pre, pass: true }))
    }
  }

  const HandleDelTc = id => {
    const onDelTc = { tea_id: id }

    axios
      .delete('http://10.21.45.100:3000/api/v1/teacherdelete', { data: onDelTc })
      .then(res => {
        console.log(res)
        window.location.reload()
        handleCloseDel()
      })
      .catch(err => {
        console.log(err)
      })
  }

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
                  <Typography variant='h5'>Management Teacher</Typography>
                  <Typography variant='subtitle1'>Management Teacher</Typography>
                </Box>
              </Box>
              <Box>
                <Button onClick={() => handleOpen()}>Insert Teacher</Button>
              </Box>
              <Box>
                <DataGrid rows={rowDataTeacher} columns={columns} getRowId={row => row.tea_id} />
                <Modal
                  open={openTc}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <Card>
                      <CardHeader title='Insert Teacher' titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent>
                        <form onSubmit={e => e.preventDefault()}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4 }}>
                              <Typography>Teacher Name :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher Name'
                                    onChange={event => HandleChange(event, 'tea_name')}
                                    error={colorChangeTc.tea_name}
                                    value={dataTeacher.tea_name}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ p: 4, ml: 6 }}>
                              <Typography>Teacher Last Name :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher Last Name'
                                    onChange={event => HandleChange(event, 'tea_lname')}
                                    error={colorChangeTc.tea_lname}
                                    value={dataTeacher.tea_lname}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4 }}>
                              <Typography>Status :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12} sm={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher Name'
                                    onChange={event => HandleChange(event, 'tea_status')}
                                    error={colorChangeTc.tea_status}
                                    value={dataTeacher.tea_status}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ p: 4, ml: 6 }}>
                              <Typography>studygroup :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id='studygroup-label'>studygroup:</InputLabel>
                                    <Select
                                      required
                                      labelId='studygroup-label'
                                      id='studygroupId'
                                      name='studygroupId'
                                      value={dataTeacher.studygroup_id}
                                      helperText={dataTeacher.studygroup_id && 'studygroup'}
                                      label='studygroup'
                                      onChange={event => HandleChange(event, 'studygroup_id')}
                                    >
                                      {studyGroup.map(row => (
                                        <MenuItem key={row.studygroup_id} value={row.studygroup_id}>
                                          {row.studygroup_name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, ml: 6, width: '8%' }}>
                              <Typography>Tel :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Tel'
                                    onChange={event => HandleChange(event, 'tea_tel')}
                                    error={colorChangeTc.tea_tel}
                                    value={dataTeacher.tea_tel}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ p: 4, ml: 6, width: '18%' }}>
                              <Typography>Curriculum :</Typography>
                            </Box>
                            <Box sx={{ width: '80%' }}>
                              <Grid item xs={12} sm={6}>
                                <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                                  <InputLabel id='curriculum-label'>Curriculum:</InputLabel>
                                  <Select
                                    required
                                    labelId='curriculum-label'
                                    id='curriculumId'
                                    name='curriculumId'
                                    value={dataTeacher.curriculum_id}
                                    helperText={dataTeacher.curriculum_id && 'Curriculum'}
                                    label='Curriculum'
                                    onChange={event => HandleChange(event, 'curriculum_id')}
                                  >
                                    {curriculum.map(row => (
                                      <MenuItem key={row.curriculum_id} value={row.curriculum_id}>
                                        {row.curriculum_name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4 }}>
                              <Typography>Teacher user :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher user'
                                    onChange={event => HandleChange(event, 'user')}
                                    error={colorChangeTc.user}
                                    value={dataTeacher.user}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ p: 4, ml: 6 }}>
                              <Typography>Teacher Password:</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher password'
                                    onChange={event => HandleChange(event, 'pass')}
                                    error={colorChangeTc.pass}
                                    value={dataTeacher.pass}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box>
                            <Button type='submit' variant='contained' size='large' onClick={() => HandleOnInsTc()}>
                              submit
                            </Button>
                            <Button onClick={() => handleClose()}>Cancel</Button>
                          </Box>
                        </form>
                      </CardContent>
                    </Card>
                  </Box>
                </Modal>
                {/* {Edit} */}
                <Modal
                  open={openEditTc}
                  onClose={handleCloseEdit}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <Card>
                      <CardHeader title='Edit Teacher' titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent>
                        <form onSubmit={e => e.preventDefault()}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4 }}>
                              <Typography>Teacher Name :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher Name'
                                    onChange={event => HandleChange(event, 'tea_name')}
                                    error={colorChangeTc.tea_name}
                                    value={dataTeacher.tea_name}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ p: 4, ml: 6 }}>
                              <Typography>Teacher Last Name :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher Last Name'
                                    onChange={event => HandleChange(event, 'tea_lname')}
                                    error={colorChangeTc.tea_lname}
                                    value={dataTeacher.tea_lname}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4 }}>
                              <Typography>Status :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12} sm={12}>
                                  <TextField
                                    fullWidth
                                    label='Status'
                                    onChange={event => HandleChange(event, 'tea_status')}
                                    error={colorChangeTc.tea_status}
                                    value={dataTeacher.tea_status}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ p: 4, ml: 6 }}>
                              <Typography>studygroup :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id='studygroup-label'>studygroup:</InputLabel>
                                    <Select
                                      required
                                      labelId='studygroup-label'
                                      id='studygroupId'
                                      name='studygroupId'
                                      value={dataTeacher.studygroup_id}
                                      helperText={dataTeacher.studygroup_id && 'studygroup'}
                                      label='studygroup'
                                      onChange={event => HandleChange(event, 'studygroup_id')}
                                    >
                                      {studyGroup.map(row => (
                                        <MenuItem key={row.studygroup_id} value={row.studygroup_id}>
                                          {row.studygroup_name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, ml: 6, width: '8%' }}>
                              <Typography>Tel :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Tel'
                                    onChange={event => HandleChange(event, 'tea_tel')}
                                    error={colorChangeTc.tea_tel}
                                    value={dataTeacher.tea_tel}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ p: 4, ml: 6, width: '18%' }}>
                              <Typography>Curriculum :</Typography>
                            </Box>
                            <Box sx={{ width: '80%' }}>
                              <Grid item xs={12} sm={6}>
                                <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                                  <InputLabel id='curriculum-label'>Curriculum:</InputLabel>
                                  <Select
                                    required
                                    labelId='curriculum-label'
                                    id='curriculumId'
                                    name='curriculumId'
                                    value={dataTeacher.curriculum_id}
                                    helperText={dataTeacher.curriculum_id && 'Curriculum'}
                                    label='Curriculum'
                                    onChange={event => HandleChange(event, 'curriculum_id')}
                                  >
                                    {curriculum.map(row => (
                                      <MenuItem key={row.curriculum_id} value={row.curriculum_id}>
                                        {row.curriculum_name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4 }}>
                              <Typography>Teacher user :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher user'
                                    onChange={event => HandleChange(event, 'user')}
                                    error={colorChangeTc.user}
                                    value={dataTeacher.user}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box sx={{ p: 4, ml: 6 }}>
                              <Typography>Teacher Password :</Typography>
                            </Box>
                            <Box sx={{ width: '30%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Teacher password'
                                    onChange={event => HandleChange(event, 'pass')}
                                    error={colorChangeTc.pass}
                                    value={dataTeacher.pass}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box>
                            <Button type='submit' variant='contained' size='large' onClick={() => HandleOnEditTc()}>
                              submit
                            </Button>
                            <Button onClick={() => handleCloseEdit()}>Cancel</Button>
                          </Box>
                        </form>
                      </CardContent>
                    </Card>
                  </Box>
                </Modal>
                <Modal
                  open={openDelTc}
                  onClose={handleCloseDel}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '30%',
                      bgcolor: 'background.paper',
                      border: '2px solid #000',
                      boxShadow: 24,
                      p: 4,
                      borderRadius: 2
                    }}
                  >
                    <Card>
                      <CardHeader title='Delete' titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent>
                        <form onSubmit={e => e.preventDefault()}>
                          <Grid container spacing={4}>
                            <Typography variant='h6'>Confirm Delete Data</Typography>
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  gap: 5,
                                  display: 'flex',
                                  flexWrap: 'rows',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '100%'
                                }}
                              >
                                <Button
                                  type='submit'
                                  variant='contained'
                                  size='large'
                                  onClick={() => HandleDelTc(getIdDelTc)}
                                >
                                  delete
                                </Button>
                                <Button
                                  type='submit'
                                  variant='contained'
                                  size='large'
                                  onClick={() => {
                                    handleCloseDel(false)
                                    setDataTeacher(intialTea)
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </form>
                      </CardContent>
                    </Card>
                  </Box>
                </Modal>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
