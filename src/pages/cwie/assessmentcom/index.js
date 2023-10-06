import * as React from 'react'
import Head from 'next/head'
import {
  Container,
  Grid,
  Paper,
  TextField,
  Radio,
  Button,
  Table,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material'

import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableBody from '@mui/material/TableBody'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const SurveyForm = () => {
  const [sum3_7, setSum3_7] = useState(0)
  const [sum3_7fi, setSum3_7fi] = useState(0)
  const [sum_12, setSum_12] = useState(0)

  const [teacherData, setTeacherData] = useState('')
  const jwtUsername = Cookies.get('jwtUsername')
  const jwtRole = Cookies.get('jwtRole')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [resetData, setResetData] = useState({})

  const [getData, setGetData] = useState({})

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
  }, [jwtUsername, jwtRole])

  useEffect(() => {
    if (status === 'อาจารย์') {
      axios.post('http://10.21.45.100:3000/api/ReadTeacher', { username: username }).then(data => {
        if (data.data.length > 0) {
          setTeacherData(data.data[0])
        }
      })
    }
  }, [username, status])

  const [dataCompany, setDataCompany] = useState([])

  useEffect(() => {
    axios.get('http://10.21.45.100:3000/api/v1/companys').then(res => {
      setDataCompany(res.data.data)
    })
  }, [])

  useEffect(() => {
    console.log('a', getData)
  }, [getData])

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

  const [dataAnswer, setDataAnswer] = useState([])

  useEffect(() => {
    const generatedData = []

    for (let i = 5; i <= 28; i++) {
      generatedData.push({
        ecom_id: i,
        anstea_value: null, // ค่า anstea_value สามารถกำหนดเป็นค่าเริ่มต้นตามความต้องการ
        com_id: getData, // ค่า com_id สามารถกำหนดเป็นค่าเริ่มต้นตามความต้องการ
        tea_id: teacherData.tea_id // ค่า tea_id สามารถกำหนดเป็นค่าเริ่มต้นตามความต้องการ
      })
    }

    setDataAnswer(generatedData)
  }, [getData, teacherData])

  const insertArray = () => {
    dataAnswer.forEach(item => {
      const dataToSend = {
        ecom_id: item.ecom_id,
        anstea_value: item.anstea_value,
        com_id: item.com_id,
        tea_id: item.tea_id
      }

      // ส่งข้อมูลแต่ละ object ไปยัง API
      axios
        .post('http://10.21.45.100:3000/api/v1/answer_teacher', dataToSend)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    })
  }

  useEffect(() => {
    console.log(costnSum1_2)
  }, [costnSum1_2])

  const handleRadioChange = (ansId, ansValue) => {
    // ใช้ map ในการอัปเดตค่า anstea_value เมื่อเจอ ecom_id ที่เท่ากับ ansId
    const updatedData = dataAnswer.map(item => {
      if (item.ecom_id === ansId) {
        return {
          ...item,
          anstea_value: ansValue
        }
      }

      return item
    })

    // นำข้อมูลที่อัปเดตแล้วมากำหนดให้กับ setDataAnswer
    setDataAnswer(updatedData)
  }

  const handleSubmit = event => {
    event.preventDefault()

    // Handle form submission, and you can access the selected values as costnSum1_2.es_id1 and costnSum1_2.es_id2
  }

  useEffect(() => {
    console.log('t', dataAnswer)
  }, [dataAnswer])

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
          <Grid item xs={12}>
            <Typography sx={{ display: 'flex', width: '100%', justifyContent: 'center', mb: 10 }} variant='h6'>
              ประเมินสถานประกอบการ (อาจารย์ประเมินสถานประกอบการ)
            </Typography>

            <form id='formqsys' name='formqsys' method='post'>
              <Paper sx={{ width: '100%', margin: 'auto' }}>
                <Box sx={{ ml: 6 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant='outlined' fullWidth sx={{ my: 6 }}>
                      <InputLabel id='dataCompany-label'>Establishment</InputLabel>
                      <Select
                        required
                        labelId='dataCompany-label'
                        id='dataCompany'
                        name='dataCompany'
                        label='dataCompany'
                        onChange={event => setGetData(event.target.value)}
                        value={getData || null}
                      >
                        {dataCompany?.map(row => (
                          <MenuItem key={row.com_id} value={row.com_id}>
                            {row.com_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Box>
                <Table sx={{ width: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle1'>หัวข้อการประเมิน</Typography>
                      </TableCell>
                      <TableCell align='center'>5</TableCell>
                      <TableCell align='center'>4</TableCell>
                      <TableCell align='center'>3</TableCell>
                      <TableCell align='center'>2</TableCell>
                      <TableCell align='center'>1</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp; 1. ความเข้าใจในปรัชญาของสหกิจศึกษา <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          checked={dataAnswer[0]?.anstea_value === 5}
                          value='5'
                          onChange={Event => handleRadioChange(5, 5)}
                          required
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          value='4'
                          checked={dataAnswer[0]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(5, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          value='3'
                          checked={dataAnswer[0]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(5, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          value='2'
                          checked={dataAnswer[0]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(5, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          value='1'
                          checked={dataAnswer[0]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(5, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1เจ้าหน้าที่ระดับบริหารและฝ่ายบุคคล
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          checked={dataAnswer[1]?.anstea_value === 5}
                          value='5'
                          onChange={Event => handleRadioChange(6, 5)}
                          required
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          value='4'
                          checked={dataAnswer[1]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(6, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          value='3'
                          checked={dataAnswer[1]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(6, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          value='2'
                          checked={dataAnswer[1]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(6, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1'
                          value='1'
                          checked={dataAnswer[1]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(6, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.2 พนักงานที่ปรึกษา</TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1_2'
                          value='5'
                          checked={dataAnswer[2]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(7, 5)}
                          required
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1_2'
                          value='4'
                          checked={dataAnswer[2]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(7, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1_2'
                          value='3'
                          checked={dataAnswer[2]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(7, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1_2'
                          value='2'
                          checked={dataAnswer[2]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(7, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id1_2'
                          value='1'
                          checked={dataAnswer[2]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(7, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>&nbsp; 2. การจัดการ และสนับสนุน</TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='5'
                          required
                          checked={dataAnswer[3]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(8, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='4'
                          checked={dataAnswer[3]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(8, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='3'
                          checked={dataAnswer[3]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(8, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='2'
                          checked={dataAnswer[3]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(8, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='1'
                          checked={dataAnswer[3]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(8, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1 การประสานงานด้านการจัดการดูแลนักศึกษาภายใน
                        <br />
                        สถานประกอบการระหว่างฝ่ายบุคคลและ Job Supervisor
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='5'
                          required
                          checked={dataAnswer[4]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(9, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='4'
                          checked={dataAnswer[4]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(9, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='3'
                          checked={dataAnswer[4]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(9, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='2'
                          checked={dataAnswer[4]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(9, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2'
                          value='1'
                          checked={dataAnswer[4]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(9, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2.2 การให้คําแนะนําดูแลนักศึกษาของฝ่ายบริหารบุคคล <br />{' '}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(ปฐมนิเทศ ระเบียบวินัย
                        ลางาน สวัสดิการ จ่ายตอบแทน){' '}
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2_2'
                          value='5'
                          required
                          checked={dataAnswer[5]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(10, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2_2'
                          value='4'
                          checked={dataAnswer[5]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(10, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2_2'
                          value='3'
                          checked={dataAnswer[5]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(10, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2_2'
                          value='2'
                          checked={dataAnswer[5]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(10, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id2_2'
                          value='1'
                          checked={dataAnswer[5]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(10, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>&nbsp; 3. ปริมาณงานที่นักศึกษาได้รับมอบหมาย</TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='5'
                          required
                          checked={dataAnswer[6]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(11, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='4'
                          checked={dataAnswer[6]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(11, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='3'
                          checked={dataAnswer[6]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(11, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='2'
                          checked={dataAnswer[6]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(11, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='1'
                          checked={dataAnswer[6]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(11, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.1ปริมาณงานที่นักศึกษาได้รับมอบหมาย{' '}
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='5'
                          required
                          checked={dataAnswer[7]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(12, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='4'
                          checked={dataAnswer[7]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(12, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='3'
                          checked={dataAnswer[7]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(12, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='2'
                          checked={dataAnswer[7]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(12, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id3'
                          value='1'
                          checked={dataAnswer[7]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(12, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp; 4. คุณภาพงาน <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='5'
                          required
                          checked={dataAnswer[8]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(13, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='4'
                          checked={dataAnswer[8]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(13, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='3'
                          checked={dataAnswer[8]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(13, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='2'
                          checked={dataAnswer[8]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(13, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='1'
                          checked={dataAnswer[8]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(13, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.1 คุณลักษณะงาน </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='5'
                          required
                          checked={dataAnswer[9]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(14, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='4'
                          checked={dataAnswer[9]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(14, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='3'
                          checked={dataAnswer[9]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(14, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='2'
                          checked={dataAnswer[9]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(14, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4'
                          value='1'
                          checked={dataAnswer[9]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(14, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.2 งานที่ได้รับมอบหมายตรงกับสาขาวิชาเอกของนักศึกษา{' '}
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_2'
                          value='5'
                          required
                          checked={dataAnswer[10]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(15, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_2'
                          value='4'
                          checked={dataAnswer[10]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(15, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_2'
                          value='3'
                          checked={dataAnswer[10]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(15, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_2'
                          value='2'
                          checked={dataAnswer[10]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(15, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_2'
                          value='1'
                          checked={dataAnswer[10]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(15, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.3 งานที่ได้รับมอบหมายตรงกับที่บริษัทเสนอ{' '}
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_3'
                          value='5'
                          required
                          checked={dataAnswer[11]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(16, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_3'
                          value='4'
                          checked={dataAnswer[11]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(16, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_3'
                          value='3'
                          checked={dataAnswer[11]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(16, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_3'
                          value='2'
                          checked={dataAnswer[11]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(16, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_3'
                          value='1'
                          checked={dataAnswer[11]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(16, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.4 งานที่ได้รับมอบหมายตรงกับความสนใจของนักศึกษา{' '}
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_4'
                          value='5'
                          required
                          checked={dataAnswer[12]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(17, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_4'
                          value='4'
                          checked={dataAnswer[12]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(17, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_4'
                          value='3'
                          checked={dataAnswer[12]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(17, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_4'
                          value='2'
                          checked={dataAnswer[12]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(17, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_4'
                          value='1'
                          checked={dataAnswer[12]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(17, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.5 ความเหมาะสมของหัวข้อรายงานที่นักศึกษาได้รับ <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_5'
                          value='5'
                          required
                          checked={dataAnswer[13]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(18, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_5'
                          value='4'
                          checked={dataAnswer[13]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(18, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_5'
                          value='3'
                          checked={dataAnswer[13]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(18, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_5'
                          value='2'
                          checked={dataAnswer[13]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(18, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id4_5'
                          value='1'
                          checked={dataAnswer[13]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(18, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp; 5. การมอบหมายงานและนิเทศงาน ของ Supervisor <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='5'
                          required
                          checked={dataAnswer[14]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(19, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='4'
                          checked={dataAnswer[14]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(19, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='3'
                          checked={dataAnswer[14]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(19, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='2'
                          checked={dataAnswer[14]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(19, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='1'
                          checked={dataAnswer[14]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(19, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.1 มี Supervisor ดูแลนักศึกษาตั้งแต่วันแรกที่เข้างาน{' '}
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='5'
                          required
                          checked={dataAnswer[15]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(20, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='4'
                          checked={dataAnswer[15]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(20, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='3'
                          checked={dataAnswer[15]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(20, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='2'
                          checked={dataAnswer[15]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(20, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5'
                          value='1'
                          checked={dataAnswer[15]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(20, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.2 ความรู้และประสบการณ์วิชาชีพของ Supervisor <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_2'
                          value='5'
                          required
                          checked={dataAnswer[16]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(21, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_2'
                          value='4'
                          checked={dataAnswer[16]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(21, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_2'
                          value='3'
                          checked={dataAnswer[16]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(21, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_2'
                          value='2'
                          checked={dataAnswer[16]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(21, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_2'
                          value='1'
                          checked={dataAnswer[16]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(21, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.3 เวลาที่ Supervisor ให้แก่นักศึกษาด้านการปฏิบัติงาน <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_3'
                          value='5'
                          required
                          checked={dataAnswer[17]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(22, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_3'
                          value='4'
                          checked={dataAnswer[17]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(22, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_3'
                          value='3'
                          checked={dataAnswer[17]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(22, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_3'
                          value='2'
                          checked={dataAnswer[17]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(22, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_3'
                          value='1'
                          checked={dataAnswer[17]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(22, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.4 เวลาที่ Supervisor ให้แก่นักศึกษาด้านการเขียนรายงาน <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_4'
                          value='5'
                          required
                          checked={dataAnswer[18]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(23, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_4'
                          value='4'
                          checked={dataAnswer[18]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(23, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_4'
                          value='3'
                          checked={dataAnswer[18]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(23, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_4'
                          value='2'
                          checked={dataAnswer[18]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(23, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_4'
                          value='1'
                          checked={dataAnswer[18]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(23, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.5 ความสนใจของ Supervisor ต่อการสอนงาน และสั่งงาน <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_5'
                          value='5'
                          required
                          checked={dataAnswer[19]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(24, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_5'
                          value='4'
                          checked={dataAnswer[19]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(24, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_5'
                          value='3'
                          checked={dataAnswer[19]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(24, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_5'
                          value='2'
                          checked={dataAnswer[19]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(24, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_5'
                          value='1'
                          checked={dataAnswer[19]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(24, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.6 การให้ความสําคัญต่อการประเมินผลการปฏิบัติงานและเขียน รายงาน
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ของ Supervisor <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_6'
                          value='5'
                          required
                          checked={dataAnswer[20]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(25, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_6'
                          value='4'
                          checked={dataAnswer[20]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(25, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_6'
                          value='3'
                          checked={dataAnswer[20]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(25, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_6'
                          value='2'
                          checked={dataAnswer[20]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(25, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_6'
                          value='1'
                          checked={dataAnswer[20]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(25, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.7 ความพร้อมของอุปกรณ์เครื่องมือสําหรับนักศึกษา <br />
                        &nbsp;(พิจารณาในกรณีนักศึกษา Co-op ซึ่งไปปฏิบัติงานชั่วคราว) <br />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_7'
                          value='5'
                          required
                          checked={dataAnswer[21]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(26, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_7'
                          value='4'
                          checked={dataAnswer[21]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(26, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_7'
                          value='3'
                          checked={dataAnswer[21]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(26, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_7'
                          value='2'
                          checked={dataAnswer[21]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(26, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_7'
                          value='1'
                          checked={dataAnswer[21]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(26, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.8 ความพร้อมของอุปกรณ์เครื่องมือสําหรับนักศึกษา
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_8'
                          value='5'
                          required
                          checked={dataAnswer[22]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(27, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_8'
                          value='4'
                          checked={dataAnswer[22]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(27, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_8'
                          value='3'
                          checked={dataAnswer[22]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(27, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_8'
                          value='2'
                          checked={dataAnswer[22]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(27, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id5_8'
                          value='1'
                          checked={dataAnswer[22]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(27, 1)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell height='30'>&nbsp;6. สรุปคุณภาพโดยรวมของสถานประกอบการแห่งน </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id6'
                          value='5'
                          required
                          checked={dataAnswer[23]?.anstea_value === 5}
                          onChange={Event => handleRadioChange(28, 5)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id6'
                          value='4'
                          checked={dataAnswer[23]?.anstea_value === 4}
                          onChange={Event => handleRadioChange(28, 4)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id6'
                          value='3'
                          checked={dataAnswer[23]?.anstea_value === 3}
                          onChange={Event => handleRadioChange(28, 3)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id6'
                          value='2'
                          checked={dataAnswer[23]?.anstea_value === 2}
                          onChange={Event => handleRadioChange(28, 2)}
                        />
                      </TableCell>
                      <TableCell height='30' align='center'>
                        <Radio
                          name='es_id6'
                          value='1'
                          checked={dataAnswer[23]?.anstea_value === 1}
                          onChange={Event => handleRadioChange(28, 1)}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>

              <Grid container justifyContent='center' mt={3}>
                <Grid item xs={12} md={6}>
                  {/* <TextField name='es_complain' label='ข้อเสนอแนะเพิ่มเติม' multiline rows={3} fullWidth /> */}
                  <Button type='submit' variant='contained' onClick={insertArray}>
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
