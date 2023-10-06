import { Box, Button, Card, CardContent, Typography, Grid, Modal, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

// Import Icon
import Icon from '@mdi/react'
import { mdiFileDocumentCheckOutline } from '@mdi/js'

const BackOfficeNEWS = () => {
  const intialNEWS = {
    new_name: '',
    new_details: ''
  }

  const [dataNews, setDataNews] = useState(intialNEWS)
  const [rowDataNEWS, setRowDataNEWS] = useState([])

  const ColorChangeNEWS = {
    new_name: false,
    new_details: false
  }

  const [ColorChange, setColoChange] = useState(ColorChangeNEWS)
  const [getId, setGetID] = useState('')

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setColoChange(ColorChangeNEWS)
    setOpen(false)
    setDataNews(intialNEWS)
  }

  const [openDel, setOpenDel] = useState(false)
  const handleOpenDel = () => setOpenDel(true)

  const handleCloseDel = () => {
    setOpenDel(false)
  }

  const HandleOnChangeNEWS = (event, type) => {
    if (type === 'new_name') {
      const newStr = event.target.value.replace('', '')
      if (dataNews.new_name !== '') {
        setColoChange(pre => ({ ...pre, new_name: false }))
      }
      setDataNews(pre => ({ ...pre, new_name: newStr }))
    } else if (type === 'new_details') {
      const newStr = event.target.value.replace('', '')
      if (dataNews.new_details !== '') {
        setColoChange(pre => ({ ...pre, new_details: false }))
      }
      setDataNews(pre => ({ ...pre, new_details: newStr }))
    }
  }

  const handleOnInsertNEWS = () => {
    if (dataNews.new_name !== '' && dataNews.new_details !== '') {
      setDataNews(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataNews // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      axios
        .post('http://localhost:3000/api/v1/insertnew', dataNews)
        .then(res => {
          window.location.reload()
          handleClose()
          setDataSt(intial)
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (dataNews.new_name !== '') {
    } else {
      setColoChange(pre => ({ ...pre, new_name: true }))
    }
    if (dataNews.new_details !== '') {
    } else {
      setColoChange(pre => ({ ...pre, new_details: true }))
    }
  }

  const handleDelNEWS = id => {
    axios
      .post('http://localhost:3000/api/v1/deletenew', { new_id: id })
      .then(res => {
        window.location.reload()
        handleCloseDel()
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log(dataNews)
  }, [dataNews])

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

  const columnNews = [
    { field: 'new_name', headerName: 'Name NEWS', width: 400 },
    { field: 'new_details', headerName: 'Detail NEWS', width: 400 },
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
            setGetID(params.id)
            handleOpenDel()
            console.log(params.row)
          }}
        >
          Del
        </Button>
      )
    }
  ]

  useEffect(() => {
    axios
      .post('http://localhost:3000/api/v1/getnews')
      .then(res => {
        setRowDataNEWS(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Grid>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', width: '100%', my: 6 }}>
            <Box>
              <Icon path={mdiFileDocumentCheckOutline} size={6} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='h4'> NEWS Management</Typography>
              <Typography variant='subtitle1'> NEWS for Co-operative</Typography>
            </Box>
          </Box>
          <Box>
            <Button onClick={handleOpen}>Insert NEWS</Button>
          </Box>
          <Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ m: 4 }}>NAME NEWS:</Typography>
                  <TextField
                    fullWidth
                    label='NAME NEWS'
                    sx={{ width: '80%' }}
                    onChange={event => HandleOnChangeNEWS(event, 'new_name')}
                    error={ColorChange.new_name}
                    value={dataNews.new_name}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ m: 4 }}> Detail:</Typography>
                  <TextField
                    fullWidth
                    label='Detail'
                    multiline
                    minRows={8}
                    onChange={event => HandleOnChangeNEWS(event, 'new_details')}
                    error={ColorChange.new_details}
                    value={dataNews.new_details}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                  <Box>
                    <Button onClick={() => handleOnInsertNEWS()}>Insert</Button>
                  </Box>
                  <Box>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </Box>
          <Box>
            <DataGrid rows={rowDataNEWS} columns={columnNews} getRowId={row => row.new_id} />
          </Box>
        </CardContent>
      </Card>
      <Box>
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
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
              <Typography variant='h6'>Confirm Delete Data</Typography>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <Box>
                <Button onClick={() => handleDelNEWS(getId)}>Delete</Button>
              </Box>
              <Box>
                <Button onClick={() => handleCloseDel()}>Cancel</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Grid>
  )
}

export default BackOfficeNEWS
