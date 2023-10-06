import { useEffect, useState } from 'react'

// ** Axios import
import axios from 'axios'

// ** Next import
import { useRouter } from 'next/router'

// ** Mui import
import {
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  CardContent
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon import
import Icon from '@mdi/react'
import { mdiChartBar } from '@mdi/js'

// SweetAlert2
import Swal from 'sweetalert2'

const Bo_Student_manage = () => {
  const intial = {
    stu_id: '',
    stu_name: '',
    stu_lname: '',
    curriculum_id: '',
    studygroup_id: '',
    stu_rmail: '',
    stu_sex: '',
    stu_status: ''
  }
  const [rowDataSt, setRowDataSt] = useState([])
  const [dataSt, setDataSt] = useState(intial)
  const [curriculumSt, setCurriculumSt] = useState([])
  const [studyGroupSt, setStudyGroupSt] = useState([])
  const [getDelSt, setGetDelSt] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const [coloChange, setColoChange] = useState({
    stu_id: false,
    stu_name: false,
    stu_lname: false,
    curriculum_id: false,
    studygroup_id: false,
    stu_rmail: false,
    stu_sex: false,
    stu_status: false
  })

  const GetStudentData = () => {
    axios.get('http://localhost:3000/api/v1/students').then(res => {
      setRowDataSt(res.data.data)
    })
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const handleFileChange = event => {
    const fileInput = event.target
    const file = fileInput.files[0]

    if (file && file.type === 'text/csv') {
      setSelectedFile(file)

      Swal.fire({
        icon: 'success',
        title: 'ไฟล์ถูกต้อง!',
        text: 'คุณต้องการอัพโหลดไฟล์นี้ใช่หรือไม่?',
        showCancelButton: true,
        confirmButtonText: 'ใช่, อัพโหลด!',
        cancelButtonText: 'ยกเลิก'
      }).then(result => {
        if (result.isConfirmed) {
          // สร้าง FormData object
          const formData = new FormData()

          // เพิ่มไฟล์ CSV ลงใน FormData
          formData.append('file', file)

          // ส่ง POST request ด้วย Axios
          axios
            .post('http://localhost:3000/api/v1/uploadStudentCSV', formData)
            .then(response => {
              const apiResponse = response.data

              if (apiResponse && apiResponse.statusCode === 200) {
                GetStudentData()
                Swal.fire({
                  icon: 'success',
                  title: apiResponse.message || 'สำเร็จ!',
                  text:
                    apiResponse.data && apiResponse.data.message
                      ? apiResponse.data.message
                      : 'ข้อมูล CSV ได้รับการประมวลผลเรียบร้อยแล้ว'
                })
              } else {
                Swal.fire({
                  icon: 'info',
                  title: apiResponse.message || 'ข้อมูลถูกส่งไปยังเซิร์ฟเวอร์',
                  text: 'กรุณาตรวจสอบข้อมูลและลองอีกครั้ง'
                })
              }
            })
            .catch(error => {
              const apiError = error.response && error.response.data
              if (apiError && apiError.statusCode === 400) {
                Swal.fire({
                  icon: 'error',
                  title: 'เกิดข้อผิดพลาด!',
                  text: apiError.message
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'เกิดข้อผิดพลาด!',
                  text: error.toString()
                })
              }
            })
        } else {
          // ผู้ใช้กด "ยกเลิก"
          Swal.fire({
            icon: 'info',
            title: 'ยกเลิกการอัพโหลด',
            text: 'คุณได้ยกเลิกการอัพโหลดไฟล์'
          })

          // รีเซ็ต input ของไฟล์
          fileInput.value = ''
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ผิดพลาด!',
        text: 'กรุณาเลือกไฟล์ CSV เท่านั้น'
      }).then(() => {
        // รีเซ็ต input ของไฟล์หลังจากแสดง alert
        fileInput.value = ''
      })
    }
  }

  const handleClose = () => {
    setOpen(false)
    setDataSt(intial)
    setColoChange(false)
  }

  const [openEditSt, setOpenEditSt] = useState(false)
  const handleOpenEditSt = () => setOpenEditSt(true)

  const handleCloseEditSt = () => {
    setOpenEditSt(false)
    setDataSt(intial)
    setColoChange(false)
  }

  const [openDelSt, setOpenDelSt] = useState(false)
  const handleOpenDelSt = () => setOpenDelSt(true)

  const handleClosDelSt = () => {
    setOpenDelSt(false)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  }

  const columns = [
    { field: 'stu_id', headerName: 'Id', width: 150 },
    { field: 'stu_name', headerName: 'Name', width: 100 },
    { field: 'stu_lname', headerName: 'Last Name', width: 120 },
    { field: 'curriculum_name', headerName: 'curriculum', width: 150 },
    { field: 'studygroup_name', headerName: 'Study Group', width: 200 },
    { field: 'stu_rmail', headerName: 'RMUTL Email', width: 200 },
    { field: 'stu_sex', headerName: 'Sex', width: 80 },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 80,
      renderCell: (
        params //ทั้งหมดมี button edit
      ) => (
        <Button
          variant='text'
          onClick={() => {
            setDataSt(params.row)
            handleOpenEditSt()
          }}
        >
          Edit
        </Button>
      )
    },
    {
      field: 'Del',
      headerName: 'Del',
      width: 80,
      renderCell: (
        params //ทั้งหมดมี button edit
      ) => (
        <Button
          variant='text'
          onClick={() => {
            setGetDelSt(params.row.Id)
            handleOpenDelSt()
            console.log(params.row)
          }}
        >
          Del
        </Button>
      )
    }
  ]

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/students').then(res => {
      setRowDataSt(res.data.data)
    })
    axios.post('http://localhost:3000/api/v1/curriculum').then(res => {
      setCurriculumSt(res.data.results)
    })
    axios.post('http://localhost:3000/api/v1/studygroup').then(res => {
      setStudyGroupSt(res.data.results)
    })
  }, [])

  useEffect(() => {
    fetchStudentData()
  }, [])

  const fetchStudentData = () => {
    axios
      .get('http://localhost:3000/api/v1/students')
      .then(response => {
        setRowDataSt(res.data.data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const HandleChange = (event, type) => {
    if (type === 'stu_id') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.stu_id !== '') {
        setColoChange(pre => ({ ...pre, stu_id: false }))
      }
      setDataSt(pre => ({ ...pre, stu_id: newStr }))
    } else if (type === 'stu_name') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.stu_name !== '') {
        setColoChange(pre => ({ ...pre, stu_name: false }))
      }
      setDataSt(pre => ({ ...pre, stu_name: newStr }))
    } else if (type === 'stu_lname') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.stu_lname !== '') {
        setColoChange(pre => ({ ...pre, stu_lname: false }))
      }
      setDataSt(pre => ({ ...pre, stu_lname: newStr }))
    } else if (type === 'stu_status') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.stu_status !== '') {
        setColoChange(pre => ({ ...pre, stu_status: false }))
      }
      setDataSt(pre => ({ ...pre, stu_status: newStr }))
    } else if (type === 'stu_rmail') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.stu_rmail !== '') {
        setColoChange(pre => ({ ...pre, stu_rmail: false }))
      }
      setDataSt(pre => ({ ...pre, stu_rmail: newStr }))
    } else if (type === 'stu_sex') {
      const newStr = event.target.value.replace('', '')
      if (dataSt.stu_sex !== '') {
        setColoChange(pre => ({ ...pre, stu_sex: false }))
      }
      setDataSt(pre => ({ ...pre, stu_sex: newStr }))
    } else if (type === 'curriculum_id') {
      const newStr = event.target.value
      if (dataSt.curriculum_id !== '') {
        setColoChange(pre => ({ ...pre, curriculum_id: false }))
      }
      setDataSt(pre => ({ ...pre, curriculum_id: newStr }))
    } else if (type === 'studygroup_id') {
      const newStr = event.target.value
      if (dataSt.studygroup_id !== '') {
        setColoChange(pre => ({ ...pre, studygroup_id: false }))
      }
      setDataSt(pre => ({ ...pre, studygroup_id: newStr }))
    }
    fetchStudentData()
  }

  const HandleInsSubmit = () => {
    if (
      dataSt.stu_id !== '' &&
      dataSt.curriculum_id !== '' &&
      dataSt.stu_name !== '' &&
      dataSt.stu_lname !== '' &&
      dataSt.stu_rmail !== '' &&
      dataSt.stu_status !== '' &&
      dataSt.studygroup_id !== ''
    ) {
      setDataSt(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataSt // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))

      axios
        .post('http://localhost:3000/api/v1/studentinsert', dataSt)
        .then(res => {
          // console.log(res)
          window.location.reload()
          handleClose()
          setDataSt(intial)
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataSt.stu_id !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_id: true }))
    }
    if (dataSt.stu_name !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_name: true }))
    }
    if (dataSt.stu_lname !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_lname: true }))
    }
    if (dataSt.stu_status !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_status: true }))
    }
    if (dataSt.stu_sex !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_sex: true }))
    }
    if (dataSt.stu_rmail !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_rmail: true }))
    }
    fetchStudentData()
  }

  const HandleOnEditSt = () => {
    if (
      dataSt.stu_id !== '' &&
      dataSt.curriculum_id !== '' &&
      dataSt.stu_name !== '' &&
      dataSt.stu_lname !== '' &&
      dataSt.stu_rmail !== '' &&
      dataSt.stu_status !== '' &&
      dataSt.studygroup_id !== '' &&
      dataSt.stu_sex !== ''
    ) {
      setDataSt(pre => ({
        ...pre,
        ...dataSt
      }))
      axios
        .post('http://localhost:3000/api/v1/studentupdate', dataSt)
        .then(res => {
          window.location.reload()
          handleCloseEditSt()
          setDataSt(intial)
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataSt.stu_id !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_id: true }))
    }
    if (dataSt.stu_name !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_name: true }))
    }
    if (dataSt.stu_lname !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_lname: true }))
    }
    if (dataSt.stu_status !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_status: true }))
    }
    if (dataSt.stu_sex !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_sex: true }))
    }
    if (dataSt.stu_rmail !== '') {
    } else {
      setColoChange(pre => ({ ...pre, stu_rmail: true }))
    }
    fetchStudentData()
  }

  const HandleDelSt = Id => {
    const onDelTc = { Id: Id }
    axios
      .delete('http://localhost:3000/api/v1/Studentdelete', { data: onDelTc })
      .then(res => {
        window.location.reload()
        fetchStudentData()
        handleClosDelSt()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Box>
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardContent>
                <Box sx={{ width: '100%', display: 'flex', my: 6 }}>
                  <Box>
                    <Icon path={mdiChartBar} size={6} />
                  </Box>
                  <Box>
                    <Typography variant='h5'>Student Management </Typography>
                    <Typography variant='subtitle1'>Student Management </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button variant='contained' sx={{ marginBlock: 2, mr: 2 }} onClick={handleOpen}>
                    เพิ่มข้อมูลนักศึกษารายคน
                  </Button>

                  <input
                    type='file'
                    id='csv-upload'
                    style={{ display: 'none' }}
                    accept='.csv'
                    onChange={handleFileChange}
                  />
                  <label htmlFor='csv-upload'>
                    <Button variant='contained' sx={{ marginBlock: 2 }} component='span'>
                      เพิ่มข้อมูลนักศึกษาด้วย CSV
                    </Button>
                  </label>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={style}>
                      <Card>
                        <CardHeader title='Insert Student' titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                          <form onSubmit={e => e.preventDefault()}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                              <Box sx={{ p: 4 }}>
                                <Typography>Student Code:</Typography>
                              </Box>
                              <Box>
                                <Grid container spacing={5}>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      label='id'
                                      onChange={event => HandleChange(event, 'stu_id')}
                                      error={coloChange.stu_id}
                                      value={dataSt.stu_id}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box sx={{ p: 4 }}>
                                <Typography>Curriculum:</Typography>
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
                                      label='Curriculum'
                                      onChange={event => HandleChange(event, 'curriculum_id')}
                                      value={curriculumSt.curriculum_id}
                                    >
                                      {curriculumSt.map(row => (
                                        <MenuItem key={row.curriculum_id} value={row.curriculum_id}>
                                          {row.curriculum_name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
                              <Box sx={{ p: 4 }}>
                                <Typography>Name:</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      label='Name'
                                      onChange={event => HandleChange(event, 'stu_name')}
                                      error={coloChange.stu_name}
                                      value={dataSt.stu_name}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box sx={{ p: 4 }}>
                                <Typography>Last Name:</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      label='Last Name'
                                      onChange={event => HandleChange(event, 'stu_lname')}
                                      error={coloChange.stu_lname}
                                      value={dataSt.stu_lname}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
                              <Box sx={{ p: 4 }}>
                                <Typography>Status:</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      label='Status'
                                      onChange={event => HandleChange(event, 'stu_status')}
                                      error={coloChange.stu_status}
                                      value={dataSt.stu_status}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box sx={{ p: 4 }}>
                                <Typography>Sex :</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      label='Sex'
                                      onChange={event => HandleChange(event, 'stu_sex')}
                                      error={coloChange.stu_sex}
                                      value={dataSt.stu_sex}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
                              <Box sx={{ p: 4 }}>
                                <Typography>RMUTL Email:</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      label='RMUTL Email'
                                      onChange={event => HandleChange(event, 'stu_rmail')}
                                      error={coloChange.stu_rmail}
                                      value={dataSt.stu_rmail}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box sx={{ width: '80%' }}>
                                <Grid item xs={12} sm={6}>
                                  <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id='StudyGroup-label'>Study Group:</InputLabel>
                                    <Select
                                      required
                                      labelId='StudyGroup-label'
                                      id='StudyGroup'
                                      name='StudyGroup'
                                      label='StudyGroup'
                                      onChange={event => HandleChange(event, 'studygroup_id')}
                                      value={studyGroupSt.studygroup_name}
                                    >
                                      {studyGroupSt.map(row => (
                                        <MenuItem key={row.studygroup_id} value={row.studygroup_id}>
                                          {row.studygroup_name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                gap: 5,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                mt: 6
                              }}
                            >
                              <Button type='submit' variant='contained' size='large' onClick={() => HandleInsSubmit()}>
                                Insert
                              </Button>
                              <Button
                                size='large'
                                onClick={() => {
                                  handleClose()
                                  setDataSt(intial)
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </form>
                        </CardContent>
                      </Card>
                    </Box>
                  </Modal>

                  {/* EditModal */}
                  <Modal
                    open={openEditSt}
                    onClose={handleCloseEditSt}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={style}>
                      <Card>
                        <CardHeader title='Insert Student' titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                          <form onSubmit={e => e.preventDefault()}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                              <Box sx={{ p: 4 }}>
                                <Typography>Student Code:</Typography>
                              </Box>
                              <Box>
                                <Grid container spacing={5}>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      label='id'
                                      onChange={event => HandleChange(event, 'stu_id')}
                                      error={coloChange.stu_id}
                                      value={dataSt.stu_id}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box sx={{ p: 4 }}>
                                <Typography>Curriculum:</Typography>
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
                                      label='Curriculum'
                                      onChange={event => HandleChange(event, 'curriculum_id')}
                                      value={curriculumSt.curriculum_id}
                                    >
                                      {curriculumSt.map(row => (
                                        <MenuItem key={row.curriculum_id} value={row.curriculum_id}>
                                          {row.curriculum_name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
                              <Box sx={{ p: 4 }}>
                                <Typography>Name:</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      label='Name'
                                      onChange={event => HandleChange(event, 'stu_name')}
                                      error={coloChange.stu_name}
                                      value={dataSt.stu_name}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box sx={{ p: 4 }}>
                                <Typography>Last Name:</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      label='Last Name'
                                      onChange={event => HandleChange(event, 'stu_lname')}
                                      error={coloChange.stu_lname}
                                      value={dataSt.stu_lname}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
                              <Box sx={{ p: 4 }}>
                                <Typography>Status:</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      label='Status'
                                      onChange={event => HandleChange(event, 'stu_status')}
                                      error={coloChange.stu_status}
                                      value={dataSt.stu_status}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box sx={{ p: 4 }}>
                                <Typography>Sex :</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      label='Sex'
                                      onChange={event => HandleChange(event, 'stu_sex')}
                                      error={coloChange.stu_sex}
                                      value={dataSt.stu_sex}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%', mt: 4 }}>
                              <Box sx={{ p: 4 }}>
                                <Typography>RMUTL Email:</Typography>
                              </Box>
                              <Box sx={{ width: '35%' }}>
                                <Grid container spacing={5}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      label='RMUTL Email'
                                      onChange={event => HandleChange(event, 'stu_rmail')}
                                      error={coloChange.stu_rmail}
                                      value={dataSt.stu_rmail}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box sx={{ width: '80%' }}>
                                <Grid item xs={12} sm={6}>
                                  <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id='StudyGroup-label'>Study Group:</InputLabel>
                                    <Select
                                      required
                                      labelId='StudyGroup-label'
                                      id='StudyGroup'
                                      name='StudyGroup'
                                      label='StudyGroup'
                                      onChange={event => HandleChange(event, 'studygroup_id')}
                                      value={studyGroupSt.studygroup_id}
                                    >
                                      {studyGroupSt.map(row => (
                                        <MenuItem key={row.studygroup_id} value={row.studygroup_id}>
                                          {row.studygroup_name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                gap: 5,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                mt: 6
                              }}
                            >
                              <Button type='submit' variant='contained' size='large' onClick={() => HandleOnEditSt()}>
                                Update
                              </Button>
                              <Button
                                size='large'
                                onClick={() => {
                                  handleCloseEditSt()
                                  setDataSt(intial)
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </form>
                        </CardContent>
                      </Card>
                    </Box>
                  </Modal>

                  <Modal
                    open={openDelSt}
                    onClose={handleClosDelSt}
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
                                    onClick={() => HandleDelSt(getDelSt)}
                                  >
                                    delete
                                  </Button>
                                  <Button
                                    type='submit'
                                    variant='contained'
                                    size='large'
                                    onClick={() => {
                                      handleClosDelSt(false)
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
                <Box>
                  <DataGrid rows={rowDataSt} columns={columns} getRowId={row => row.stu_id} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Bo_Student_manage
