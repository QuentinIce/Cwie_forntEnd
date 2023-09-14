import React from 'react'
import Head from 'next/head'
import { Container, Grid, Paper, TextField, Radio, Button } from '@mui/material'
import { useEffect, useState } from 'react'

const SurveyForm = () => {

  const [sum3_7, setSum3_7] = useState(0);
  const [sum3_7fi, setSum3_7fi] = useState(0);
  const [sum_12, setSum_12] = useState(0);
  const [costnSum1_2, setCostnSum1_2] = useState({
    es_id1: '',
    es_id1_2: '',
    es_id1_3: '',
    es_id1_4: '',
    es_id1_5: '',
    es_id1_6: '',
    es_id1_7: '',
    es_id2: '',
  })
  const [costnSum3_7, setCostnSum3_7] = useState({
    es_id3: '',
    es_id4: '',
    es_id5: '',
    es_id6: '',
    es_id6_2: '',
    es_id6_3: '',
    es_id6_4: '',
    es_id7: '',
  })

  const handleRadioChange = event => {
    const { name, value } = event.target
    setCostnSum1_2(prevState => ({ ...prevState, [name]: value }))
  }

  const handleRadioChange3_7 = event => {
    const { name, value } = event.target
    setCostnSum3_7(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Handle form submission, and you can access the selected values as costnSum1_2.es_id1 and costnSum1_2.es_id2
  }

  useEffect(() => {
    // Perform the addition and store the result in sum_12
    const es_id1Value = parseInt(costnSum1_2.es_id1) || 0;
    const es_id1_2Value = parseInt(costnSum1_2.es_id1_2) || 0;
    const es_id1_3Value = parseInt(costnSum1_2.es_id1_3) || 0;
    const es_id1_4Value = parseInt(costnSum1_2.es_id1_4) || 0;
    const es_id1_5Value = parseInt(costnSum1_2.es_id1_5) || 0;
    const es_id1_6Value = parseInt(costnSum1_2.es_id1_6) || 0;
    const es_id1_7Value = parseInt(costnSum1_2.es_id1_7) || 0;
    const es_id2Value = parseInt(costnSum1_2.es_id2) || 0;
    setSum_12(es_id1Value + es_id2Value + es_id1_2Value + es_id1_3Value + es_id1_4Value + es_id1_5Value + es_id1_6Value + es_id1_7Value);
  }, [costnSum1_2]);

  useEffect(() => {
    // Perform the addition and store the result in sum_12
    const es_id3Value = parseInt(costnSum3_7.es_id3) || 0;
    const es_id4Value = parseInt(costnSum3_7.es_id4) || 0;
    const es_id5Value = parseInt(costnSum3_7.es_id5) || 0;
    const es_id6Value = parseInt(costnSum3_7.es_id6) || 0;
    const es_id6_2Value = parseInt(costnSum3_7.es_id6_2) || 0;
    const es_id6_3Value = parseInt(costnSum3_7.es_id6_3) || 0;
    const es_id6_4_7Value = parseInt(costnSum3_7.es_id6_4) || 0;
    const es_id7Value = parseInt(costnSum3_7.es_id7) || 0;
    setSum3_7(es_id3Value + es_id4Value + es_id5Value + es_id6Value + es_id6_2Value + es_id6_3Value + es_id6_4_7Value + es_id7Value);
  }, [costnSum3_7]);

  // useEffect(() => {
  //   // Perform the division by 2 if sum_12 is not 0, otherwise, keep it as 0
  //   if (sum3_7 !== 0) {
  //     setSum3_7fi(sum3_7 / 4);
  //   }
  // }, [sum3_7]);

  // useEffect(() => {
  //   console.log(sum3_7fi)
  // }, [handleSubmit])

  const handleSubmitClik = event => {
    setSum3_7fi(sum3_7 + sum_12)
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
            <h3 align='center'>ประเมินนักศึกษา (ระหว่างนิเทศ)</h3>
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
                      <td height='30'>&nbsp; 1. การพัฒนาตนเอง <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1 บุคลิกภาพ</td>
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
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.2 การพัฒนาตนเอง</td>
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
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.3 วุฒิภาวะ</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_3' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_3' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_3' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_3' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_3' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.4 การปรับตัว</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_4' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_4' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_4' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_4' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_4' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.5 การแสดงความคิดเห็น การแสดงออก</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_5' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_5' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_5' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_5' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_5' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.6 มนุษยสัมพันธ์</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_6' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_6' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_6' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_6' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_6' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.7 ทัศนคติ</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_7' value='5' onChange={handleRadioChange} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_7' value='4' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_7' value='3' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_7' value='2' onChange={handleRadioChange} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id1_7' value='1' onChange={handleRadioChange} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp; 2. การแสดงความมีส่วนร่วมกับองค์กร</td>
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
                      <td height='30'>&nbsp; 3. ความประพฤติ คุณธรรม จริยธรรม และปฏิบัติ <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ตามกฏระเบียบวินัยขององค์การ เช่น การขาดงาน การลา มาสาย </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='5' onChange={handleRadioChange3_7} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='4' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='3' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='2' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id3' value='1' onChange={handleRadioChange3_7} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp; 4. ความรู้ความสามารถพื้นฐานที่จำเป็นต่อการปฏิบัติงานที่ได้รับมอบหมาย</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='5' onChange={handleRadioChange3_7} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='4' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='3' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='2' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id4' value='1' onChange={handleRadioChange3_7} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp; 5. ความก้าวหน้าของการจัดทำรายงาน </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='5' onChange={handleRadioChange3_7} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='4' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='3' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='2' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id5' value='1' onChange={handleRadioChange3_7} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;<border> 6. ความพึงพอใจของนักศึกษา </border><br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.1 การพัฒนาตนเอง </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='5' onChange={handleRadioChange3_7} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='4' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='3' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='2' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6' value='1' onChange={handleRadioChange3_7} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.2 ต่องานที่ได้รับปฏิบัติและสถานประกอบการ </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_2' value='5' onChange={handleRadioChange3_7} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_2' value='4' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_2' value='3' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_2' value='2' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_2' value='1' onChange={handleRadioChange3_7} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.3 ต่อความเหมาะสมความปลอดภัย ของที่พัก</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_3' value='5' onChange={handleRadioChange3_7} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_3' value='4' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_3' value='3' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_3' value='2' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_3' value='1' onChange={handleRadioChange3_7} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.4 ต่อความเหมาะสมของค่าตอบแทน</td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_4' value='5' onChange={handleRadioChange3_7} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_4' value='4' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_4' value='3' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_4' value='2' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id6_4' value='1' onChange={handleRadioChange3_7} />
                      </td>
                    </tr>
                    <tr>
                      <td height='30'> &nbsp; <border>7. สรุปโดยรวมของนักศึกษา </border></td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id7' value='5' onChange={handleRadioChange3_7} required />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id7' value='4' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id7' value='3' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id7' value='2' onChange={handleRadioChange3_7} />
                      </td>
                      <td height='30' align='center'>
                        <input type='radio' name='es_id7' value='1' onChange={handleRadioChange3_7} />
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
