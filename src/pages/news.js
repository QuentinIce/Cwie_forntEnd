import Grid from '@mui/material/Grid'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from '@mui/material/Modal'

const dummyImage = [
  {
    img: 'https://ba.rmuti.ac.th/is21/images/news/News-220210922223231.jpg'
  },
  {
    img: 'https://cdn.chiangmainews.co.th/wp-content/uploads/2023/08/08095936/1691463576_223549-chiangmainews.jpg'
  },
  {
    img: 'https://www.guideubon.com/2.0/files/5216/8062/0266/Major-UBU-02.jpg'
  },
  {
    img: ''
  }
]

export default function news() {
  const [dataNews, setDataNews] = useState('')
  const [dataNewsRow, setDataNewsRow] = useState('')

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 1
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const HandleRowAndOpenNews = data => {
    setDataNewsRow(data)
    setOpen(true)
  }

  useEffect(() => {
    axios
      .post('http://localhost:3200/api/v1/getnews')
      .then(res => {
        setDataNews(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Box>
      <Grid container spacing={6} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h5'>NEWS</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        {Object.values(dataNews)?.map((datanews, index) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia sx={{ height: '14.5625rem' }} image={dummyImage[index].img} />
              <CardContent sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant='h5' sx={{ marginBottom: 2 }}>
                  {datanews.new_name}
                </Typography>
                <Button
                  variant='contained'
                  sx={{ padding: theme => theme.spacing(1.75, 5.5), mt: 4 }}
                  onClick={() => HandleRowAndOpenNews(datanews)}
                >
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Grid container spacing={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 10, width: '100%' }}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h5'>{dataNewsRow.new_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ m: 2 }} variant='h6'>
                  รายละเอียดขาว
                </Typography>
                <Typography sx={{ m: 2 }} variant='h6'>
                  {dataNewsRow.new_details}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
