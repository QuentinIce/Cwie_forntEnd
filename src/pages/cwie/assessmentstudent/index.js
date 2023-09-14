import React from 'react'
import Head from 'next/head'
import { Container, Grid, Paper, TextField, Radio, Button } from '@mui/material'
import { useEffect, useState } from 'react'

const SurveyForm = () => {
  const [sum4, setSum4] = useState({
    text15: '',
    text16: '',
    text17: '',
    text18: ''
  })

  const [sum3, setSum3] = useState({
    text11: '',
    text12: '',
    text13: '',
    text14: ''
  })

  const [sum2, setSum2] = useState({
    text3: '',
    text4: '',
    text5: '',
    text6: '',
    text7: '',
    text8: '',
    text9: '',
    text10: '',
    totalScore: 0
  })
  const [sumfi, setSumfi] = useState(0)

  const [values, setValues] = useState({
    text1: '',
    text2: ''
  })

  const handleChange2 = event => {
    const { name, value } = event.target
    setSum2(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleChange = event => {
    const { name, value } = event.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleChange3 = event => {
    const { name, value } = event.target
    setSum3(prevValues => ({ ...prevValues, [name]: value }))
  }

  const handleChange4 = event => {
    const { name, value } = event.target
    setSum4(prevValues => ({ ...prevValues, [name]: value }))
  }

  useEffect(() => {
    const es_id1Value = parseInt(sum2.text3) || 0
    const es_id1_2Value = parseInt(sum2.text4) || 0
    const es_id1_3Value = parseInt(sum2.text5) || 0
    const es_id1_4Value = parseInt(sum2.text6) || 0
    const es_id1_5Value = parseInt(sum2.text7) || 0
    const es_id1_6Value = parseInt(sum2.text8) || 0
    const es_id1_7Value = parseInt(sum2.text9) || 0
    const es_id2Value = parseInt(sum2.text10) || 0

    const totalScore =
      es_id1Value +
      es_id1_2Value +
      es_id1_3Value +
      es_id1_4Value +
      es_id1_5Value +
      es_id1_6Value +
      es_id1_7Value +
      es_id2Value

    setSum2(prevState => ({ ...prevState, totalScore }))
  }, [setSum2])

  useEffect(() => {
    if (sum2.totalScore !== undefined && sum2.totalScore !== 0) {
      setSum2(prevState => ({ ...prevState, totalScore: prevState.totalScore / 4 }))
    }
  }, [sum2.totalScore])

  const handleSubmitClik = event => {
    setSumfi(values + sum2 + sum3 + sum4)
  }

  return (
    <>
      <Container sx={{ bgcolor: '#2C3E50' }}>
        <Grid container>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={11}>
            {/* <?php // include('menu.php'); ?> */}
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container>
          <Grid item xs={12} md={3}>
            {/* <?php // include('menu_l.php'); ?> */}
          </Grid>
          <Grid item xs={12} md={10}>
            <h3 align='center'>ประเมินนักศึกษา (สถานประกอบการประเมินนักศึกษา)</h3>
            <form id='formqsys' name='formqsys' method='post'>
              <Paper sx={{ width: '70%', margin: 'auto' }}>
                {/** หัวข้อที่ 1 */}
                <table width='100%' border='1' cellPadding='0' cellSpacing='0'>
                  <thead>
                    <tr>
                      <td width='75%' rowspan='2' align='center'>
                        <strong>หัวข้อการประเมิน (ผลสําเร็จของงาน/Work Achievement )</strong>
                      </td>
                    </tr>
                    <tr>
                      <td width='5%' align='center'>
                        <strong> คะแนน </strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td height='100' class='left-align'>
                        &nbsp; 1. ปริมาณงาน (Quality of work) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;กำหนด (ในระดับที่นกศักษาจะปฏิบัติได้)
                        และเทียบกับนักศึกษาทั่วๆ ไป
                      </td>
                      <td height='100' align='center'>
                        20 คะแนน
                        <input
                          type='text'
                          name='text1'
                          align='center'
                          value={values.text1}
                          onChange={handleChange}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='100' class='left-align'>
                        &nbsp; 2. คุณภาพงาน(Quality of work) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ทํางานได้ถูกต้องครบถ้วนมีความประณีตเรียบร้อย มีความรอบคอบ
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไม่เกิดปัญหาติดตามมางานไม่ค้างคา
                        ทํางานเสร็จทันเวลาหรือก่อนเวลาที่กำหนด
                      </td>
                      <td height='100' align='center'>
                        20 คะแนน
                        <input
                          type='text'
                          name='text2'
                          align='center'
                          value={values.text2}
                          onChange={handleChange}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/** ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <br></br> {/** หัวข้อที่ 2 */}
                <table width='100%' border='1' cellPadding='0' cellSpacing='0'>
                  <thead>
                    <tr>
                      <td width='75%' rowspan='2' align='center'>
                        <strong>หัวข้อการประเมิน (ความรู้ความสามารถ/Knowledge and Ability)</strong>
                      </td>
                    </tr>
                    <tr>
                      <td width='5%' align='center'>
                        <strong> คะแนน </strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 3. ความรู้ความสามารถทางวิชาการ (Academic ability) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;นักศึกษามีความรู้ทางวิชาการเพียงพอ
                        ที่จะทํางานตามที่ได้รับมอบหมาย
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(ในระดับที่นักศึกษาจะปฏิบัติได้)
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text3'
                          align='center'
                          value={sum2.text3}
                          onChange={handleChange2}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 4. ความสามารถในการเรียนรู้และประยุกตว์ ิชาการ (Ability to learn and apply
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Knowledge) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความรวดเร็วในการเรียนรู้เข้าใจข้อมูล ข่าวสาร
                        และวิธีการทํางาน ตลอดจนการนํา
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความรู้ไปประยุกต์ใช้งาน
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text4'
                          align='center'
                          value={sum2.text4}
                          onChange={handleChange2}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 5. ความรุ้ความชำนาญด้านปฏิบัติการ (Practical ability) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เช่น การปฏิบัติงานในภาคสนาม ในห้องปฏิบัติการ
                        <br />
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text5'
                          align='center'
                          value={sum2.text5}
                          onChange={handleChange2}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 6. วิจารณญาณและการตัดสินใจ (Judgments and decision making) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ตัดสินใจให้ได้ดี ถูกต้อง รวดเร็ว
                        มีการวิเคราะห์ข้อมูลและปัญหาต่างๆอย่างรอบคอบ
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text6'
                          align='center'
                          value={sum2.text6}
                          onChange={handleChange2}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 7. การจัดการและวางแผน (Organization and Planning) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;มีการวางแผนและขั้นตอนการจัดการอย่างเป็นระบบ
                        ไม่ก่อให้เกิดความสูญเสียแก่งาน
                        <br />
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text7'
                          align='center'
                          value={sum2.text7}
                          onChange={handleChange2}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='100' class='left-align'>
                        &nbsp; 8. ทักษะการสื่อสาร (Communication skills) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความสามารถในการติดต่อสื่อสาร การพูด การเขียน
                        และการนําเสนอ(Presentation)
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สามารถสื่อให้เข้าใจได้ง่าย เรียบร้อย ชัดเจน ถูกต้อง รัดกุม
                        มีลำดับขั้นตอนที่ดี <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไม่ก่อให้เกิดความสับสนต่อการทํางาน รู้จักสอบถาม
                        รู้จักชี้แจงการปฏิบัติงานและ <br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อขัดข้องให้ทราบ
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text8'
                          align='center'
                          value={sum2.text8}
                          onChange={handleChange2}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='100' class='left-align'>
                        &nbsp; 9. การพัฒนาด้านภาษาและวัฒนธรรมตางประเทศ ่ (Foreign language and cultural <br></br>{' '}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;development) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เช่น ภาษาอังกฤษ การทำงานกับชาวต่างชาติ
                        <br />
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text9'
                          align='center'
                          value={sum2.text9}
                          onChange={handleChange2}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='100' class='left-align'>
                        &nbsp; 10. ความเหมาะสมต่อตำแหน่งที่ได้รับมอบหมาย (Suitability For job position) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สามารถพัฒนาตนเองให้ปฏิบัติงานตาม job description
                        ที่มอบหมายได้อย่างเหมาะ
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สมหรือตําแหน่งงานนี้เหมาะสมกับนักศึกษาคนนี้หรือไม่เพียงใด
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text10'
                          align='center'
                          value={sum2.text10}
                          onChange={handleChange2}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/** ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <br></br> {/** หัวข้อที่ 3 */}
                <table width='100%' border='1' cellPadding='0' cellSpacing='0'>
                  <thead>
                    <tr>
                      <td width='75%' rowspan='2' align='center'>
                        <strong>หัวข้อการประเมิน (ความรับผิดชอบต่อหน้าที่/Responsibility) </strong>
                      </td>
                    </tr>
                    <tr>
                      <td width='5%' align='center'>
                        <strong> คะแนน </strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td height='80' class='left-align'>
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
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text3'
                          align='center'
                          value={sum3.text11}
                          onChange={handleChange3}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 12. ความสนใจ อุตสาหะในการทํางาน (Interested in work ) <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความสนใจและความกระตือรือร้นในการทํางาน
                        มีความอุตสาหะ ความพยายาม <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความตั้งใจที่จะทํางานได้สําเร็จ ความมานะบากบั่น
                        ไม่ย่อท้อต่ออุปสรรคและปัญหา
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ความรู้ไปประยุกต์ใช้งาน
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text4'
                          align='center'
                          value={sum3.text12}
                          onChange={handleChange3}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 13. ความสามารถเริ่มต้นทำงานได้ด้วยตนเอง (Initiative or self starter) <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เมื่อได้รับคําชี้แนะ
                        สามารถเริ่มทํางานได้ด้วยตนเอง โดยไม่ต้องรอคําสั่ง <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(กรณีงานประจํา) เสนอตัวเข้าช่วยงานแทบทุกอย่าง
                        มาขอรับงานใหม่ๆ ไปมา
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ไม่ปล่อยเวลาว่าง ให้ล่วงเลยไปโดยเปล่าประโยชน์
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text4'
                          align='center'
                          value={sum3.text13}
                          onChange={handleChange3}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 14. การตอบสนองต่อการสั่งการ (Response to supervision ) <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยินดีรับคําสั่ง คําแนะนํา
                        คําวิจารณ์ไม่แสดงความอึดอัดใจ เมื่อได้รับคําติเตือน <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;และวิจารณ์ความเร็วในการปฏิบัติตามคําสั่ง
                        การปรับตัวปฏิบัติตามคําแนะนํา
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อเสนอแนะและวิจารณ์
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text4'
                          align='center'
                          value={sum3.text14}
                          onChange={handleChange3}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/** ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <br></br> {/** หัวข้อที่ 4 */}
                <table width='100%' border='1' cellPadding='0' cellSpacing='0'>
                  <thead>
                    <tr>
                      <td width='75%' rowspan='2' align='center'>
                        <strong>หัวข้อการประเมิน (ลักษณะส่วนบคคล ุ /Personality) </strong>
                      </td>
                    </tr>
                    <tr>
                      <td width='5%' align='center'>
                        <strong> คะแนน </strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 15. บุคลิกภาพและการวางตัว(Personality) <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;มีบุคลิกภาพและวางตัวได้เหมาะสม เช่น ทัศนคติวุฒิภาวะ
                        ความอ่อนน้อมถ่อมตน
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;การแต่งกาย กิริยาวาจา การตรงต่อเวลา และอื่นๆ <br />
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text3'
                          align='center'
                          value={sum4.text15}
                          onChange={handleChange4}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 16. มนุษยสัมพันธ์ (Interpersonal skills) <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สามารถร่วมงานกับผู้อื่น การทํางานเป็นทีม
                        สร้างมนุษยสัมพันธ์ได้ดีเป็นที่รักใคร <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชอบพอของผู้ร่วมงาน
                        เป็นผู้ที่ช่วยก่อให้เกิดความร่วมมือประสานงาน
                        <br />
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text4'
                          align='center'
                          value={sum4.text16}
                          onChange={handleChange4}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 17. ความมีระเบียบวินัย ปฏิบัติตามวัฒนธรรมขององค์กร <br></br>
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
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text4'
                          align='center'
                          value={sum4.text17}
                          onChange={handleChange4}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td height='80' class='left-align'>
                        &nbsp; 18. คุณธรรมและจริยธรรม (Ethics and morality) <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;มีความซื่อสัตย์สุจริต มีจิตใจสะอาด
                        รู้จักเสียสละ ไม่เห็นแก่ตัว เอื้อเฟื้อช่วยเหลือผู้อื่น <br />
                      </td>
                      <td height='30' align='center'>
                        10 คะแนน
                        <input
                          type='text'
                          name='text4'
                          align='center'
                          value={sum4.text18}
                          onChange={handleChange4}
                          style={{ width: '80px', height: '50px' }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Paper>
              <Grid container justifyContent='center' mt={3}>
                <Grid item xs={12} md={6}>
                  {/* <TextField name='es_complain' label='ข้อเสนอแนะเพิ่มเติม' multiline rows={3} fullWidth /> */}
                  <Button type='submit' variant='contained' onClick={handleSubmitClik}>
                    ส่งแบบประเมิน
                  </Button>
                  {sumfi !== 0 && <p>ผลรวมคะแนน: {sumfi}</p>}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
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
