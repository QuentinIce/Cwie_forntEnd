import { Box, Card, CardMedia, Typography } from '@mui/material'
import Image from 'next/image'

export default function about() {
  return (
    <Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mb: 10 }}>
        <Typography variant='h4'>About</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box sx={{ width: '50%', mt: 30, fontFamily: '', ml: 30 }}>
          <Typography variant='subtitle1' sx={{ fontFamily: '' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;ด้วยคณะวิศวกรรมศาสตร์
            มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนาได้กำหนดวิสัยทัศน์ที่มุ่งหมายในการผลิตบัณฑิตนักปฏิบัติที่มีความเชี่ยวชาญทางด้านวิทยาศาสตร์และเทคโนโลยี
            มีคุณธรรมจริยธรรมสาขาวิชาชีพ สร้างผลงานวิจัยและพัฒนาเชิงสร้างสรรค์นวัตกรรมเพื่อสังคมสู่สากล
            โดยมุ่งเน้นกระบวนการจัดการศึกษาเฉพาะทาง
          </Typography>
        </Box>
        <Box sx={{ ml: 30 }}>
          <Card>
            <Image src={'/images/dean.png'} width={300} height={300} />
          </Card>
        </Box>
      </Box>
      <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', mt: 10 }}>
        <Typography variant='h5' sx={{ width: '50%' }}>
          โครงการพัฒนาทักษะวิชาชีพของนักศึกษา คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
          (สหกิจศึกษาและการฝึกงานทางวิศวกรรม) Cooperative Education & Engineering Practice
        </Typography>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 10, mb: 6 }}>
        <Typography sx={{ width: '80%', fontFamily: 'IBM Plex Sans Thai' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สหกิจศึกษา (Cooperative Education)
          เป็นแผนการศึกษาโดยมีจุดมุ่งหมายให้บัณฑิตวิศวกรรมศาสตร์ได้มีประสบการณ์ปฏิบัติงานจริงในสถานประกอบการอย่างมีประสิทธิภาพ
          โดยกำหนดให้นักศึกษาออกปฏิบัติงานในสถานประกอบการ ในฐานะพนักงานเต็มเวลา เป็นระยะเวลา ๑ ภาคการศึกษา
          หรือไม่น้อยกว่า ๑๕ สัปดาห์ โดยเน้นให้นักศึกษาได้นำเอาวิชาการทั้งทางภาคทฤษฎีและปฏิบัติต่างๆ
          ที่ได้ศึกษามาแล้วนำไปปฏิบัติในสถานประกอบการให้ได้ผลดี
          ทำให้บัณฑิตวิศวกรรมศาสตร์สามารถเรียนรู้ประสบการณ์จากการไปปฏิบัติงาน
          และทำให้บัณฑิตวิศวกรรมศาสตร์มีคุณภาพตรงตามวัตถุประสงค์ที่สถานประกอบการต้องการมากที่สุด
          เพื่อเป็นการส่งเสริมความสัมพันธ์และความร่วมมือ
          อันดีระหว่างคณะวิศวกรรมศาสตร์กับสถานประกอบการที่บัณฑิตวิศวกรรมศาสตร์ได้ไปปฏิบัติ
          อีกทั้งเป็นการเผยแพร่เกียรติคุณของคณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ต่อบุคคลและหน่วยงานต่างๆ
          ที่อยู่ภายนอก
        </Typography>
      </Box>
    </Box>
  )
}
