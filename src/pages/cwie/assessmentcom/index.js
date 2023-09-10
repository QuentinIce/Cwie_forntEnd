import React from 'react'
import Head from 'next/head'
import { Container, Grid, Paper, TextField, Radio, Button } from '@mui/material'
import { useEffect, useState } from 'react'

const SurveyForm = () => {
  const [sum3_7, setSum3_7] = useState(0)
  const [sum3_7fi, setSum3_7fi] = useState(0)
  const [sum_12, setSum_12] = useState(0)
  const [costnSum1_2, setCostnSum1_2] = useState({
    es_id1: '',
    es_id1_2: '',
    es_id2: '',
    es_id2_2: '',
    es_id3: '',
    es_id4: '',
    es_id4_2: '',
    es_id4_3: '',
    es_id4_4: '',
    es_id4_5: '',
    es_id5: '',
    es_id5_2: '',
    es_id5_3: '',
    es_id5_4: '',
    es_id5_5: '',
    es_id5_6: '',
    es_id5_7: '',
    es_id5_8: '',
    es_id6: ''
  })

  const handleRadioChange = event => {
    const { name, value } = event.target
    setCostnSum1_2(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Handle form submission, and you can access the selected values as costnSum1_2.es_id1 and costnSum1_2.es_id2
  }

  useEffect(() => {
    // Perform the addition and store the result in sum_12
    const id1 = parseInt(costnSum1_2.es_id1) || 0
    const id2 = parseInt(costnSum1_2.es_id1_2) || 0
    const id3 = parseInt(costnSum1_2.es_id2) || 0
    const id4 = parseInt(costnSum1_2.es_id2_2) || 0
    const id5 = parseInt(costnSum1_2.es_id3) || 0
    const id6 = parseInt(costnSum1_2.es_id4) || 0
    const id7 = parseInt(costnSum1_2.es_id4_2) || 0
    const id8 = parseInt(costnSum1_2.es_id4_3) || 0
    const id9 = parseInt(costnSum1_2.es_id4_4) || 0
    const id10 = parseInt(costnSum1_2.es_id4_5) || 0
    const id11 = parseInt(costnSum1_2.es_id5) || 0
    const id12 = parseInt(costnSum1_2.es_id5_2) || 0
    const id13 = parseInt(costnSum1_2.es_id5_3) || 0
    const id14 = parseInt(costnSum1_2.es_id5_4) || 0
    const id15 = parseInt(costnSum1_2.es_id5_5) || 0
    const id16 = parseInt(costnSum1_2.es_id5_6) || 0
    const id17 = parseInt(costnSum1_2.es_id5_7) || 0
    const id18 = parseInt(costnSum1_2.es_id5_8) || 0
    const id19 = parseInt(costnSum1_2.es_id5_6) || 0
    setSum_12(
      id1 +
        id2 +
        id3 +
        id4 +
        id5 +
        id6 +
        id7 +
        id8 +
        id9 +
        id10 +
        id11 +
        id12 +
        id13 +
        id14 +
        id15 +
        id16 +
        id17 +
        id18 +
        id19
    )
  }, [costnSum1_2])

  const handleSubmitClik = event => {
    setSum3_7fi(sum_12)
    // Handle form submission, and you can access the selected values as costnSum1_2.es_id1 and costnSum1_2.es_id2
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
            <h3 align='center'>ประเมินสถานประกอบการ (อาจารย์ประเมินสถานประกอบการ)</h3>
            <form id='formqsys' name='formqsys' method='post'>
              <Paper sx={{ width: '70%', margin: 'auto' }}>
                <table width='100%' border='1' cellPadding='0' cellSpacing='0'>
                  <thead>
                    <tr>
                      <td width='75%' rowspan='2' align='center'>
                        <strong>หัวข้อการประเมิน</strong>
                      </td>
                    </tr>
                    <tr>
                      <td width='5%' align='center'>
                        <strong>5</strong>
                      </td>
                      <td width='5%' align='center'>
                        <strong>4</strong>
                      </td>
                      <td width='5%' align='center'>
                        <strong>3</strong>
                      </td>
                      <td width='5%' align='center'>
                        <strong>2</strong>
                      </td>
                      <td width='5%' align='center'>
                        <strong>1</strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td height='30'>
                        &nbsp; 1. ความเข้าใจในปรัชญาของสหกิจศึกษา <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1
                        เจ้าหน้าที่ระดับบริหารและฝ่ายบุคคล
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.2 พนักงานที่ปรึกษา</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_2' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_2' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_2' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_2' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_2' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp; 2. การจัดการ และสนับสนุน <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1
                        การประสานงานด้านการจัดการดูแลนักศึกษาภายในสถานประกอบการ
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ระหว่างฝ่ายบุคคลและ Job
                        Supervisor
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2.2 การให้คําแนะนําดูแลนักศึกษาของฝ่ายบริหารบุคคล <br />{' '}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(ปฐมนิเทศ ระเบียบวินัย
                        ลางาน สวัสดิการ จ่ายตอบแทน){' '}
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2_2' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2_2' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2_2' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2_2' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id2_2' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp; 3. ปริมาณงานที่นักศึกษาได้รับมอบหมาย <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.1ปริมาณงานที่นักศึกษาได้รับมอบหมาย{' '}
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp; 4. คุณภาพงาน <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.1 คุณลักษณะงาน{' '}
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.2 งานที่ได้รับมอบหมายตรงกับสาขาวิชาเอกของนักศึกษา{' '}
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_2' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_2' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_2' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_2' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_2' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.3 งานที่ได้รับมอบหมายตรงกับที่บริษัทเสนอ </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_3' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_3' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_3' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_3' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_3' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.4 งานที่ได้รับมอบหมายตรงกับความสนใจของนักศึกษา{' '}
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_4' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_4' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_4' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_4' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_4' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.5 ความเหมาะสมของหัวข้อรายงานที่นักศึกษาได้รับ <br />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_5' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_5' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_5' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_5' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4_5' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp; 5. การมอบหมายงานและนิเทศงาน ของ Supervisor <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.1 มี Supervisor ดูแลนักศึกษาตั้งแต่วันแรกที่เข้างาน{' '}
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.2 ความรู้และประสบการณ์วิชาชีพของ Supervisor <br />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_2' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_2' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_2' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_2' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_2' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.3 เวลาที่ Supervisor ให้แก่นักศึกษาด้านการปฏิบัติงาน <br />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_3' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_3' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_3' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_3' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_3' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.4 เวลาที่ Supervisor ให้แก่นักศึกษาด้านการเขียนรายงาน <br />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_4' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_4' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_4' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_4' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_4' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.5 ความสนใจของ Supervisor ต่อการสอนงาน และสั่งงาน <br />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_5' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_5' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_5' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_5' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_5' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.6 การให้ความสําคัญต่อการประเมินผลการปฏิบัติงานและเขียน รายงาน
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ของ Supervisor <br />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_6' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_6' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_6' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_6' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_6' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.7 ความพร้อมของอุปกรณ์เครื่องมือสําหรับนักศึกษา <br />
                        &nbsp;(พิจารณาในกรณีนักศึกษา Co-op ซึ่งไปปฏิบัติงานชั่วคราว) <br />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_7' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_7' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_7' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_7' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_7' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.8 ความพร้อมของอุปกรณ์เครื่องมือสําหรับนักศึกษา
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_8' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_8' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_8' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_8' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5_8' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>
                        &nbsp;<border> 6. สรุปคุณภาพโดยรวมของสถานประกอบการแห่งน </border>{' '}
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='1' onChange={handleRadioChange} />
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
                  {sum3_7fi !== 0 && <p>ผลรวมคะแนน: {sum3_7fi}</p>}
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
