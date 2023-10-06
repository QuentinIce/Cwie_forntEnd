import React, { useEffect, useState } from 'react'

// ** Axios
import axios from 'axios'

// ** Cookies
import Cookies from 'js-cookie'

// ** Mui
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  MenuItem,
  Radio,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

const Assessment = () => {
  const answerInit = []

  for (let i = 1; i <= 18; i++) {
    if (i === 1 || i === 13) {
      continue // Skip the loop iteration if i is 1 or 6
    }
    answerInit.push({
      estu_id: i,
      anstu_value: null,
      tea_id: null,
      id: null
    })
  }

  const [questions, setQuestions] = useState([])
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [teacherData, setTeacherData] = useState({})
  const [answerData, setAnswerData] = useState(answerInit)

  // ** รายชื่อนักศึกษา
  const [studentData, setStudentData] = useState([])

  // ** id นักศึกษาที่เลือก
  const [selectStudentId, setSelectStudentId] = useState(null)

  useEffect(() => {
    const jwtUsername = Cookies.get('jwtUsername')
    const jwtRole = Cookies.get('jwtRole')

    axios
      .get('http://localhost:3000/api/v1/getquestion_student')
      .then(res => {
        setQuestions(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })

    axios
      .post('http://localhost:3000/api/verify_authen', {
        token: jwtUsername,
        tokenRole: jwtRole
      })
      .then(data => {
        setUsername(data.data.User)
        setStatus(data.data.stateRole)
      })
      .catch(err => {
        console.log(err)
      })

    axios
      .get('http://localhost:3000/api/v1/students')
      .then(res => {
        setStudentData(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (status === 'อาจารย์') {
      axios.post('http://localhost:3000/api/ReadTeacher', { username: username }).then(data => {
        if (data.data.length > 0) {
          setTeacherData(data.data[0])
        }
      })
    }
  }, [username, status])

  useEffect(() => {
    setAnswerData(prev => {
      return prev.map((ans, index) => {
        return {
          ...ans,
          tea_id: teacherData.tea_id,
          Id: selectStudentId
        }
      })
    })
  }, [selectStudentId, teacherData])

  const handleRadioChange = (estu_id, value) => {
    setAnswerData(prevState => {
      return prevState.map(item => {
        if (item.estu_id === estu_id) {
          return {
            ...item,
            anstu_value: value
          }
        }

        return item
      })
    })
  }

  const resetAnswerData = () => {
    setAnswerData(prevState => {
      return prevState.map(item => {
        return {
          ...item,
          anstu_value: null
        }
      })
    })
  }

  const handleSubmitClick = () => {
    axios
      .post('http://localhost:3000/api/v1/sendquestion_student', { answerData: answerData })
      .then(res => {
        console.log('res: ', res)
        console.log('answerData: ', answerData)
        console.log('success')
      })
      .catch(err => {
        console.log(err)
      })

    resetAnswerData()
  }

  useEffect(() => {
    console.log('teacherData: ', answerData)
  }, [answerData])

  useEffect(() => {
    console.log('quest: ', questions)
  }, [questions])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
            <Typography variant='h4'>แบบประเมิน</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box fullWidth sx={{ ml: 4, mb: 4, minWidth: 200, maxWidth: 300 }}>
            <Typography>เลือกนักศึกษาที่ต้องการประเมิน</Typography>
            <Select fullWidth value={selectStudentId} onChange={event => setSelectStudentId(event.target.value)}>
              {studentData.map((item, index) => (
                <MenuItem value={item.Id} key={item.Id}>
                  {item.stu_name} {item.stu_lname}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        {selectStudentId && (
          <>
            <Grid item xs={12} sx={{ minWidth: 600 }}>
              <Card sx={{ display: 'flex', justifyContent: 'center', m: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Questions</TableCell>
                      <TableCell align='center'>5</TableCell>
                      <TableCell align='center'>4</TableCell>
                      <TableCell align='center'>3</TableCell>
                      <TableCell align='center'>2</TableCell>
                      <TableCell align='center'>1</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map((question, index) => (
                      <TableRow key={index}>
                        {question.estu_order === 1 || question.estu_order === 6 ? (
                          <TableCell align='left' colSpan={6}>
                            <Typography variant='h6'>
                              {question.estu_order} {question.estu_title}
                            </Typography>
                          </TableCell>
                        ) : (
                          <>
                            <TableCell component='th' scope='row'>
                              <Typography variant='body1'>
                                {question.estu_order} {question.estu_title}
                              </Typography>
                            </TableCell>
                            {[5, 4, 3, 2, 1].map(score => (
                              <TableCell align='center' key={score}>
                                <Radio
                                  checked={
                                    (answerData.find(item => item.estu_id === question.estu_id) || {}).anstu_value ===
                                    score
                                  }
                                  onChange={() => handleRadioChange(question.estu_id, score)}
                                  value={score}
                                />
                              </TableCell>
                            ))}
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                <Button variant='contained' color='primary' sx={{ mr: 2 }} onClick={handleSubmitClick}>
                  บันทึก
                </Button>
                <Button variant='contained' color='error' onClick={resetAnswerData}>
                  ล้างข้อมูล
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}

export default Assessment
