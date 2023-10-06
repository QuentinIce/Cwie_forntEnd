import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import CardMedia from '@mui/material/CardMedia'

export default function Calendar() {
  const pdfC1 = 'http://10.21.45.100:3000/calendar/calendar_coop_66.pdf'
  const pdfC2 = 'http://10.21.45.100:3000/calendar/calendar_coop_65.pdf'
  const pdfC3 = 'http://10.21.45.100:3000/calendar/calendar_coop_64_1.pdf'
  const pdfC4 = 'http://10.21.45.100:3000/calendar/calendar_coop_2-63_covid.pdf'

  const DownloadFileAtURL = url => {
    const fileName = url.split('/').pop()
    const aTag = document.createElement('a')
    aTag.href = url
    aTag.setAttribute('download', fileName)
    document.body.appendChild(aTag)
    aTag.click()
    aTag.remove()
  }

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h5'>Calendar</Typography>
              </Box>
              <Box>
                <Box>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>File Name</TableCell>
                          <TableCell>File </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>ปฏิทินกำหนดการโครงการพัฒนาทักษะวิชาชีพนักศึกษา ประจำปีการศึกษา 2566</TableCell>
                          <TableCell>
                            <Button variant='contained' onClick={() => DownloadFileAtURL(pdfC1)}>
                              <Typography sx={{ color: 'white' }}>PDF</Typography>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ปฏิทินกำหนดการโครงการพัฒนาทักษะวิชาชีพนักศึกษา ประจำปีการศึกษา 2565</TableCell>
                          <TableCell>
                            <Button variant='contained' onClick={() => DownloadFileAtURL(pdfC2)}>
                              <Typography sx={{ color: 'white' }}>PDF</Typography>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ปฏิทินกำหนดการโครงการพัฒนาทักษะวิชาชีพนักศึกษา ประจำปีการศึกษา 2564</TableCell>
                          <TableCell>
                            <Button variant='contained' onClick={() => DownloadFileAtURL(pdfC3)}>
                              <Typography sx={{ color: 'white' }}>PDF</Typography>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            ปฏิทินกำหนดการโครงการพัฒนาทักษะวิชาชีพนักศึกษา ประจำปีการศึกษา 2563 (ฉบับที่ 2) COVID-19
                          </TableCell>
                          <TableCell>
                            <Button variant='contained' onClick={() => DownloadFileAtURL(pdfC4)}>
                              <Typography sx={{ color: 'white' }}>PDF</Typography>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
