import React from 'react'
import Head from 'next/head'
import {
  Container,
  Grid,
  Paper,
  TextField,
  Radio,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
  Select,
  MenuItem
} from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const SurveyForm = () => {
  // ** state
  const jwtUsername = Cookies.get('jwtUsername')
  const jwtRole = Cookies.get('jwtRole')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [resetData, setResetData] = useState({})
  const [getData, setGetData] = useState([])

  // ** ข้อมูลสถานประกอบการ
  const [companyData, setCompanyData] = useState('')

  // ** รายชื่อนักศึกษา
  const [studentData, setStudentData] = useState([])

  // ** id นักศึกษาที่เลือก
  const [selectStudentId, setSelectStudentId] = useState(null)

  // ** ข้อมูลคำตอบ
  const [answerData, setAnswerData] = useState(
    Array.from({ length: 18 }, (_, i) => ({
      ecomstu_id: i + 1,
      anscom_value: 0,
      com_id: null,
      Id: null
    }))
  )

  const [isInitialized, setIsInitialized] = useState(false)
  const [prevStudentId, setPrevStudentId] = useState(null)

  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูล companyData และ selectStudentId ที่พร้อมใช้งาน
    if (companyData && selectStudentId && (selectStudentId !== prevStudentId || !isInitialized)) {
      // ทำการกำหนดค่าเริ่มต้นใหม่ให้ answerData
      const newAnswerInit = Array.from({ length: 18 }, (_, i) => ({
        ecomstu_id: i + 1,
        anscom_value: 0,
        com_id: companyData.com_id,
        Id: selectStudentId
      }))

      setAnswerData(newAnswerInit)
      setIsInitialized(true)
      setPrevStudentId(selectStudentId)
    }
  }, [companyData, selectStudentId, isInitialized, prevStudentId])

  useEffect(() => {
    console.log('test: ', answerData)
  }, [answerData])

  const handleChange = (ecom_id, event) => {
    let value = parseInt(event.target.value, 10) // แปลง string ให้เป็น integer

    if (isNaN(value)) {
      // ตรวจสอบว่าไม่ใช่ NaN
      value = 0 // หรือค่าที่คุณต้องการให้เป็นเมื่อไม่ใช่ตัวเลข
    }

    if (value > 20) {
      value = 20
    }

    setAnswerData(prevState => {
      return prevState.map(item => {
        if (item.ecomstu_id === ecom_id) {
          return {
            ...item,
            anscom_value: value // ใช้ค่าที่ถูกแปลงแล้ว
          }
        }

        return item
      })
    })
  }

  const handleSubmitClick = () => {
    console.log('1', answerData)

    axios
      .post(
        'http://10.21.45.100:3000/api/v2/answer_company_student',
        { answerData: answerData },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        // ตรวจสอบสถานะการส่งคำขอ HTTP 200 เป็นสถานะสำเร็จ
        if (res.status === 200) {
          console.log('สำเร็จ: ', res.data) // คืนค่าข้อมูลที่ได้จากเซิร์ฟเวอร์
        } else {
          console.log('การส่งคำขอไม่สำเร็จ')
        }
      })
      .catch(err => {
        // การจัดการข้อผิดพลาดจากคำขอ
        console.log('เกิดข้อผิดพลาด: ', err)
      })
  }

  useEffect(() => {
    console.log(getData)
  }, [getData])

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

    axios
      .get('http://10.21.45.100:3000/api/v1/students')
      .then(res => {
        setStudentData(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [jwtUsername, jwtRole])

  useEffect(() => {
    if (status === 'สถานประกอบการ') {
      axios.post('http://10.21.45.100:3000/api/Read_Company', { username: username }).then(data => {
        if (data.data.length > 0) {
          setCompanyData(data.data[0])
        }
      })
    }
  }, [username, status])

  useEffect(() => {
    console.log(getData)
  }, [getData])

  useEffect(() => {
    console.log('studentData: ', studentData)
  }, [studentData])

  if (answerData.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Box fullWidth sx={{ mb: 4 }}>
        <Typography>เลือกนักศึกษาที่ต้องการประเมิน</Typography>
        <Select value={selectStudentId} onChange={event => setSelectStudentId(event.target.value)}>
          {studentData.map((item, index) => (
            <MenuItem value={item.Id} key={item.Id}>
              {item.stu_name} {item.stu_lname}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container rowSpacing={6}>
        <Grid item xs={12} md={10}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 10 }}>
            <Typography variant='h6'>ประเมินนักศึกษา (สถานประกอบการประเมินนักศึกษา)</Typography>
          </Box>
          <form id='formqsys' name='formqsys' method='post'>
            <Paper sx={{ width: '100%', margin: 'auto' }}>
              {/** หัวข้อที่ 1 */}
              <Table sx={{ width: '100%' }} cellPadding='0' cellSpacing='0'>
                <TableHead>
                  <TableRow>
                    <TableCell width='75%' rowSpan='2' align='center'>
                      หัวข้อการประเมิน (ผลสําเร็จของงาน/Work Achievement )
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width='5%' align='center'>
                      คะแนน
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell height='100' className='left-align'>
                      &nbsp; 1. ปริมาณงาน (Quality of work) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;กำหนด (ในระดับที่นกศักษาจะปฏิบัติได้) และเทียบกับนักศึกษาทั่วๆ
                      ไป
                    </TableCell>
                    <TableCell height='100' align='center'>
                      20 คะแนน
                      <TextField
                        type='text'
                        name='text1'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 1).anscom_value || 0}
                        onChange={event => handleChange(1, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='100' className='left-align'>
                      &nbsp; 2. คุณภาพงาน(Quality of work) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ทํางานได้ถ้กต้องครบถ้วนมีความประณีตเรียบร้อย มีความรอบคอบ
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไม่เกิดปัญหาติดตามมางานไม่ค้างคา
                      ทํางานเสร็จทันเวลาหรือก่อนเวลาที่กำหนด
                    </TableCell>
                    <TableCell height='100' align='center'>
                      20 คะแนน
                      <TextField
                        type='text'
                        name='text2'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 2).anscom_value}
                        onChange={event => handleChange(2, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/** ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
              <br></br> {/** หัวข้อที่ 2 */}
              <Table sx={{ width: '100%' }} cellPadding='0' cellSpacing='0'>
                <TableHead>
                  <TableRow>
                    <TableCell width='75%' rowSpan='2' align='center'>
                      หัวข้อการประเมิน (ความรู้ความสามารถ/Knowledge and Ability)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width='5%' align='center'>
                      คะแนน
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 3. ความรู้ความสามารถทางวิชาการ (Academic ability) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;นักศึกษามีความรู้ทางวิชาการเพียงพอ
                      ที่จะทํางานตามที่ได้รับมอบหมาย
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(ในระดับที่นักศึกษาจะปฏิบัติได้)
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text3'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 3).anscom_value}
                        onChange={event => handleChange(3, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 4. ความสามารถในการเรียนรู้และประยุกตว์ ิชาการ (Ability to learn and apply
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Knowledge) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความรวดเร็วในการเรียนรู้เข้าใจข้อมูล ข่าวสาร และวิธีการทํางาน
                      ตลอดจนการนํา
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความรู้ไปประยุกต์ใช้งาน
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text4'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 4).anscom_value}
                        onChange={event => handleChange(4, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 5. ความรุ้ความชำนาญด้านปฏิบัติการ (Practical ability) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เช่น การปฏิบัติงานในภาคสนาม ในห้องปฏิบัติการ
                      <br />
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text5'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 5).anscom_value}
                        onChange={event => handleChange(5, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 6. วิจารณญาณและการตัดสินใจ (Judgments and decision making) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ตัดสินใจให้ได้ดี ถูกต้อง รวดเร็ว
                      มีการวิเคราะห์ข้อมูลและปัญหาต่างๆอย่างรอบคอบ
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text6'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 6).anscom_value}
                        onChange={event => handleChange(6, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 7. การจัดการและวางแผน (Organization and Planning) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;มีการวางแผนและขั้นตอนการจัดการอย่างเป็นระบบ
                      ไม่ก่อให้เกิดความสูญเสียแก่งาน
                      <br />
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text7'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 7).anscom_value}
                        onChange={event => handleChange(7, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='100' className='left-align'>
                      &nbsp; 8. ทักษะการสื่อสาร (Communication skills) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความสามารถในการติดต่อสื่อสาร การพูด การเขียน
                      และการนําเสนอ(Presentation)
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สามารถสื่อให้เข้าใจได้ง่าย เรียบร้อย ชัดเจน ถูกต้อง รัดกุม
                      มีลำดับขั้นตอนที่ดี <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไม่ก่อให้เกิดความสับสนต่อการทํางาน รู้จักสอบถาม
                      รู้จักชี้แจงการปฏิบัติงานและ <br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อขัดข้องให้ทราบ
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text8'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 8).anscom_value}
                        onChange={event => handleChange(8, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='100' className='left-align'>
                      &nbsp; 9. การพัฒนาด้านภาษาและวัฒนธรรมตางประเทศ ่ (Foreign language and cultural <br></br>{' '}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;development) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เช่น ภาษาอังกฤษ การทำงานกับชาวต่างชาติ
                      <br />
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text9'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 9).anscom_value}
                        onChange={event => handleChange(9, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='100' className='left-align'>
                      &nbsp; 10. ความเหมาะสมต่อตำแหน่งที่ได้รับมอบหมาย (Suitability For job position) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สามารถพัฒนาตนเองให้ปฏิบัติงานตาม job description
                      ที่มอบหมายได้อย่างเหมาะ
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สมหรือตําแหน่งงานนี้เหมาะสมกับนักศึกษาคนนี้หรือไม่เพียงใด
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text10'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 10).anscom_value}
                        onChange={event => handleChange(10, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/** ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
              <br></br> {/** หัวข้อที่ 3 */}
              <Table sx={{ width: '100%' }} cellPadding='0' cellSpacing='0'>
                <TableHead>
                  <TableRow>
                    <TableCell width='75%' rowSpan='2' align='center'>
                      หัวข้อการประเมิน (ความรับผิดชอบต่อหน้าที่/Responsibility)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width='5%' align='center'>
                      คะแนน
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 11. ความรับผิดชอบและเป็นผทู้ ี่ไว้วางใจได้(Responsibility and dependability) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ดําเนินงานให้สําเร็จลุล่วงโดยคํานึงถึงเป้าหมาย
                      และความสําเร็จของงานเป็นหลัก
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยอมรับผลที่เกิดจากการทํางานอย่างมีเหตุผล
                      สามารถปล่อยให้ทํางาน <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(กรณีงานประจํา)ได้โดยไม่ต้องควบคุมจนมากเกินไป
                      ความจําเป็นในการตรวจสอบขั้น <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ตอนและผลงานตลอดเวลา
                      สามารถไว้วางใจให้รับผิดชอบงานที่มากกว่าเวลาประจํา
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สามารถไว้วางใจได้
                      แทบทุกสถานการณ์หรือในสถานการณ์ปกติเท่านั้น <br />
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text3'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 11).anscom_value}
                        onChange={event => handleChange(11, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 12. ความสนใจ อุตสาหะในการทํางาน (Interested in work ) <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความสนใจและความกระตือรือร้นในการทํางาน
                      มีความอุตสาหะ ความพยายาม <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความตั้งใจที่จะทํางานได้สําเร็จ ความมานะบากบั่น
                      ไม่ย่อท้อต่ออุปสรรคและปัญหา
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความรู้ไปประยุกต์ใช้งาน
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text4'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 12).anscom_value}
                        onChange={event => handleChange(12, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 13. ความสามารถเริ่มต้นทำงานได้ด้วยตนเอง (Initiative or self starter) <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เมื่อได้รับคําชี้แนะ สามารถเริ่มทํางานได้ด้วยตนเอง
                      โดยไม่ต้องรอคําสั่ง <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(กรณีงานประจํา) เสนอตัวเข้าช่วยงานแทบทุกอย่าง
                      มาขอรับงานใหม่ๆ ไปมา
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไม่ปล่อยเวลาว่าง ให้ล่วงเลยไปโดยเปล่าประโยชน์
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text4'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 13).anscom_value}
                        onChange={event => handleChange(13, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 14. การตอบสนองต่อการสั่งการ (Response to supervision ) <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยินดีรับคําสั่ง คําแนะนํา
                      คําวิจารณ์ไม่แสดงความอึดอัดใจ เมื่อได้รับคําติเตือน <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;และวิจารณ์ความเร็วในการปฏิบัติตามคําสั่ง
                      การปรับตัวปฏิบัติตามคําแนะนํา
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อเสนอแนะและวิจารณ์
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text4'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 14).anscom_value}
                        onChange={event => handleChange(14, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/** ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
              <br></br> {/** หัวข้อที่ 4 */}
              <Table sx={{ width: '100%' }} cellPadding='0' cellSpacing='0'>
                <TableHead>
                  <TableRow>
                    <TableCell width='75%' rowSpan='2' align='center'>
                      หัวข้อการประเมิน (ลักษณะส่วนบคคล ุ /Personality)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width='5%' align='center'>
                      คะแนน
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 15. บุคลิกภาพและการวางตัว(Personality) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;มีบุคลิกภาพและวางตัวได้เหมาะสม เช่น ทัศนคติวุฒิภาวะ
                      ความอ่อนน้อมถ่อมตน
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;การแต่งกาย กิริยาวาจา การตรงต่อเวลา และอื่นๆ <br />
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text3'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 15).anscom_value}
                        onChange={event => handleChange(15, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 16. มนุษยสัมพันธ์ (Interpersonal skills) <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สามารถร่วมงานกับผู้อื่น การทํางานเป็นทีม
                      สร้างมนุษยสัมพันธ์ได้ดีเป็นที่รักใคร <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชอบพอของผู้ร่วมงาน
                      เป็นผู้ที่ช่วยก่อให้เกิดความร่วมมือประสานงาน
                      <br />
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text4'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 16).anscom_value}
                        onChange={event => handleChange(16, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 17. ความมีระเบียบวนิัย ปฏบิัติตามวัฒนธรรมขององค์กร <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Discipline and adaptability to formal
                      organization) <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความสนใจเรียนรู้ศึกษา กฎระเบียบ นโยบายต่างๆ
                      และปฏิบัติตามโดยเต็มใจ
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;การปฏิบัติตามระเบียบบริหารงานบุคคล(การเข้างาน
                      ลางาน)
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ปฏิบัติตามกฎการรักษาความปลอดภัยในโรงงาน
                      การควบคุมคุณภาพ 5 ส และอื่นๆ
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text4'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 17).anscom_value}
                        onChange={event => handleChange(17, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell height='80' className='left-align'>
                      &nbsp; 18. คุณธรรมและจริยธรรม (Ethics and morality) <br></br>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;มีความซอสื่ ัตย์สุจริต มจีิตใจสะอาด รจู้ักเสียสละ
                      ไมเห่ ็นแก่ตัว เอื้อเฟื้อช่วยเหลือผู้อื่น <br />
                    </TableCell>
                    <TableCell height='30' align='center'>
                      10 คะแนน
                      <TextField
                        type='text'
                        name='text4'
                        align='center'
                        value={answerData.find(item => item.ecomstu_id === 18).anscom_value}
                        onChange={event => handleChange(18, event)}
                        style={{ width: '80px', height: '50px' }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            <Grid container justifyContent='center' mt={3}>
              <Grid item xs={12} md={6}>
                {/* <TextField name='es_complain' label='ข้อเสนอแนะเพิ่มเติม' multiline rows={3} fullWidth /> */}
                <Button type='submit' variant='contained' onClick={() => handleSubmitClick()}>
                  ส่งแบบประเมิน
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

const SurveyPage = () => {
  return (
    <>
      <Head>
        <title>Survey Form</title>
      </Head>
      <SurveyForm />
    </>
  )
}

export default SurveyPage
