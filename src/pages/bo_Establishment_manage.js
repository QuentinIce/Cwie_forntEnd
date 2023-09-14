import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Box, Button, Card, CardContent, Typography, Modal, CardHeader, TextField } from '@mui/material'
import Icon from '@mdi/react'
import { mdiAccountMultiple } from '@mdi/js'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

export default function bo_Establishment_manage() {
  const intialComp = {
    com_name: '',
    com_type: '',
    com_add: '',
    com_province: '',
    com_contact: ''
  }
  const [rowDataComp, setRowDataComp] = useState('')
  const [dataCompany, setDataCompany] = useState(intialComp)

  const [coloChangeComp, setColoChangeComp] = useState({
    com_name: false,
    com_type: false,
    com_add: false,
    com_province: false,
    com_contact: false
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setDataCompany(intialComp)
    setColoChangeComp(false)
  }

  const [openEdit, setOpenEdit] = useState(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => {
    setOpenEdit(false)
    setDataCompany(intialComp)
    setColoChangeComp(false)
  }

  const [openDel, setOpenDel] = useState(false)
  const [getIdComp, setGetIdComp] = useState()
  const handleOpenDel = () => setOpenDel(true)
  const handleCloseDel = () => setOpenDel(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  }

  const columns = [
    { field: 'com_name', headerName: 'Name', width: 150 },
    { field: 'com_type', headerName: 'Type', width: 150 },
    { field: 'com_add', headerName: 'Address', width: 150 },
    { field: 'com_province', headerName: 'Province', width: 150 },
    { field: 'com_contact', headerName: 'Contact', width: 150 },
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
            setDataCompany(params.row)
            handleOpenEdit()
            console.log(params.row)
          }}
        >
          Edit
        </Button>
      )
    },
    {
      field: 'DEL',
      headerName: 'DEL',
      width: 150,
      renderCell: (
        params //ทั้งหมดมี button del
      ) => (
        <Button
          variant='text'
          onClick={() => {
            handleOpenDel()
            setGetIdComp(params.id) // สั่งให้ id ที่เลือกไปเก็บใน Getid
          }}
        >
          DEL
        </Button>
      )
    }
  ]

  const HandleDelComp = id => {
    const onDel = { com_id: id }
    console.log('id', onDel)
    axios
      .delete('http://localhost:3200/api/v1/companydelete', { data: onDel })
      .then(res => {
        console.log(res)
        window.location.reload()
        handleCloseDel()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const HandleChangeComp = (event, type) => {
    if (type === 'com_name') {
      //เช็ค type ที่ส่งมาใช้ dog_name ?
      const newStr = event.target.value.replace(/[^ก-๙เ\s]/g, '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataCompany.com_name !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColoChangeComp(pre => ({ ...pre, com_name: false }))
      }
      setDataCompany(pre => ({ ...pre, com_name: newStr }))
    } else if (type === 'com_type') {
      //เช็ค type ที่ส่งมาใช้ dog_name ?
      const newStr = event.target.value.replace(/[^ก-๙เ\s]/g, '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataCompany.com_type !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColoChangeComp(pre => ({ ...pre, com_type: false }))
      }
      setDataCompany(pre => ({ ...pre, com_type: newStr }))
    } else if (type === 'com_add') {
      //เช็ค type ที่ส่งมาใช้ dog_name ?
      const newStr = event.target.value.replace(/[^ก-๙เ\s]/g, '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataCompany.com_add !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColoChangeComp(pre => ({ ...pre, com_add: false }))
      }
      setDataCompany(pre => ({ ...pre, com_add: newStr }))
    } else if (type === 'com_province') {
      //เช็ค type ที่ส่งมาใช้ dog_name ?
      const newStr = event.target.value.replace(/[^ก-๙เ\s]/g, '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataCompany.com_province !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColoChangeComp(pre => ({ ...pre, com_province: false }))
      }
      setDataCompany(pre => ({ ...pre, com_province: newStr }))
    } else if (type === 'com_contact') {
      //เช็ค type ที่ส่งมาใช้ dog_name ?
      const newStr = event.target.value.replace(/[^ก-๙เ\s]/g, '') // อีเว้นที่เกิด เป้าหมายคือค่า value
      if (dataCompany.com_contact !== '') {
        //ถ้าค่าไม่ว่างให้เซ็ตสีปกติ
        setColoChangeComp(pre => ({ ...pre, com_contact: false }))
      }
      setDataCompany(pre => ({ ...pre, com_contact: newStr }))
    }
  }

  const HandleOnInsComp = () => {
    if (
      dataCompany.com_name !== '' &&
      dataCompany.com_type !== '' &&
      dataCompany.com_add !== '' &&
      dataCompany.com_province !== '' &&
      dataCompany.com_contact !== ''
    ) {
      setDataCompany(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataCompany // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      axios
        .post('http://localhost:3200/api/v1/companyinsert', dataCompany)
        .then(res => {
          console.log(res)
          window.location.reload()
          handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataCompany.com_name !== '') {
      console.log('com_name ไม่ว่าง')
    } else {
      console.log('com_name ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_name: true }))
    }
    if (dataCompany.com_type !== '') {
      console.log('com_type ไม่ว่าง')
    } else {
      console.log('com_type ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_type: true }))
    }
    if (dataCompany.com_add !== '') {
      console.log('com_add ไม่ว่าง')
    } else {
      console.log('com_add ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_add: true }))
    }
    if (dataCompany.com_province !== '') {
      console.log('com_province ไม่ว่าง')
    } else {
      console.log('com_province ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_province: true }))
    }
    if (dataCompany.com_contact !== '') {
      console.log('com_contact ไม่ว่าง')
    } else {
      console.log('com_contact ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_contact: true }))
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3200/api/v1/companys').then(res => {
      setRowDataComp(res.data.data)
    })
  }, [])

  useEffect(() => {
    console.log(dataCompany)
  }, [dataCompany])

  const HandleEditComp = () => {
    if (
      dataCompany.com_name !== '' &&
      dataCompany.com_type !== '' &&
      dataCompany.com_add !== '' &&
      dataCompany.com_province !== '' &&
      dataCompany.com_contact !== ''
    ) {
      setDataCompany(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataCompany // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      axios
        .post('http://localhost:3200/api/v1/companyupdate', dataCompany)
        .then(res => {
          console.log(res)
          window.location.reload()
          handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataCompany.com_name !== '') {
      console.log('com_name ไม่ว่าง')
    } else {
      console.log('com_name ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_name: true }))
    }
    if (dataCompany.com_type !== '') {
      console.log('com_type ไม่ว่าง')
    } else {
      console.log('com_type ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_type: true }))
    }
    if (dataCompany.com_add !== '') {
      console.log('com_add ไม่ว่าง')
    } else {
      console.log('com_add ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_add: true }))
    }
    if (dataCompany.com_province !== '') {
      console.log('com_province ไม่ว่าง')
    } else {
      console.log('com_province ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_province: true }))
    }
    if (dataCompany.com_contact !== '') {
      console.log('com_contact ไม่ว่าง')
    } else {
      console.log('com_contact ว่าง')
      setColoChangeComp(pre => ({ ...pre, com_contact: true }))
    }
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
                  <Typography variant='h5'>Management Establishment</Typography>
                  <Typography variant='subtitle1'>Management Establishment</Typography>
                </Box>
              </Box>
              <Box>
                <Button onClick={handleOpen}>Insert Establishment</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <Card>
                      <CardHeader title='Insert Establishment' titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent>
                        <form onSubmit={e => e.preventDefault()}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '25%' }}>
                              <Typography>Establishment Name</Typography>
                            </Box>
                            <Box sx={{ width: '90%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Name'
                                    onChange={event => HandleChangeComp(event, 'com_name')}
                                    error={coloChangeComp.com_name}
                                    value={dataCompany.com_name}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '22%' }}>
                              <Typography>Establishment Type</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Type'
                                    onChange={event => HandleChangeComp(event, 'com_type')}
                                    error={coloChangeComp.com_type}
                                    value={dataCompany.com_type}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '22%' }}>
                              <Typography>Establishment Addres</Typography>
                            </Box>
                            <Box sx={{ width: '80%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Address'
                                    multiline
                                    minRows={2}
                                    onChange={event => HandleChangeComp(event, 'com_add')}
                                    error={coloChangeComp.com_add}
                                    value={dataCompany.com_add}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '22%' }}>
                              <Typography>Establishment Province</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Province'
                                    onChange={event => HandleChangeComp(event, 'com_province')}
                                    error={coloChangeComp.com_province}
                                    value={dataCompany.com_province}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '22%' }}>
                              <Typography>Establishment Contact</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Contact'
                                    onChange={event => HandleChangeComp(event, 'com_contact')}
                                    error={coloChangeComp.com_contact}
                                    value={dataCompany.com_contact}
                                  />
                                </Grid>
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
                            <Button type='submit' variant='contained' size='large' onClick={() => HandleOnInsComp()}>
                              Insert
                            </Button>
                            <Button size='large' onClick={() => handleClose()}>
                              Cancel
                            </Button>
                          </Box>
                        </form>
                      </CardContent>
                    </Card>
                  </Box>
                </Modal>
                <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style}>
                    <Card>
                      <CardHeader title='Insert Establishment' titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent>
                        <form onSubmit={e => e.preventDefault()}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '25%' }}>
                              <Typography>Establishment Name</Typography>
                            </Box>
                            <Box sx={{ width: '90%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Name'
                                    onChange={event => HandleChangeComp(event, 'com_name')}
                                    error={coloChangeComp.com_name}
                                    value={dataCompany.com_name}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '22%' }}>
                              <Typography>Establishment Type</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Type'
                                    onChange={event => HandleChangeComp(event, 'com_type')}
                                    error={coloChangeComp.com_type}
                                    value={dataCompany.com_type}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '22%' }}>
                              <Typography>Establishment Addres</Typography>
                            </Box>
                            <Box sx={{ width: '80%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Address'
                                    multiline
                                    minRows={2}
                                    onChange={event => HandleChangeComp(event, 'com_add')}
                                    error={coloChangeComp.com_add}
                                    value={dataCompany.com_add}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '22%' }}>
                              <Typography>Establishment Province</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Province'
                                    onChange={event => HandleChangeComp(event, 'com_province')}
                                    error={coloChangeComp.com_province}
                                    value={dataCompany.com_province}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 6 }}>
                            <Box sx={{ p: 4, width: '22%' }}>
                              <Typography>Establishment Contact</Typography>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label='Establishment Contact'
                                    onChange={event => HandleChangeComp(event, 'com_contact')}
                                    error={coloChangeComp.com_contact}
                                    value={dataCompany.com_contact}
                                  />
                                </Grid>
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
                            <Button type='submit' variant='contained' size='large' onClick={() => HandleEditComp()}>
                              Update
                            </Button>
                            <Button size='large' onClick={() => handleCloseEdit()}>
                              Cancel
                            </Button>
                          </Box>
                        </form>
                      </CardContent>
                    </Card>
                  </Box>
                </Modal>
                <Modal
                  open={openDel}
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
                            <Grid item xs={6}>
                              <Typography variant='h6'>Confirm Delete Data</Typography>
                              <Box
                                sx={{
                                  gap: 5,
                                  display: 'flex',
                                  flexWrap: 'rows',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <Button
                                  type='submit'
                                  variant='contained'
                                  size='large'
                                  onClick={() => HandleDelComp(getIdComp)}
                                >
                                  delete
                                </Button>
                                <Button
                                  type='submit'
                                  variant='contained'
                                  size='large'
                                  onClick={() => {
                                    handleCloseDel(false)
                                    setDataCompany(intialComp)
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
                <DataGrid rows={rowDataComp} columns={columns} getRowId={row => row.com_id} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
