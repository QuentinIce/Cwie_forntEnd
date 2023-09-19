import {
  Container,
  Grid,
  Paper,
  TextField,
  Radio,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const ShowAssessmentStudent = () => {
  const jwtUsername = Cookies.get('jwtUsername')
  const jwtRole = Cookies.get('jwtRole')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [studentData, setStudentData] = useState('')
  const [filterStudent, setFilterStudent] = useState([])

  // const [getStudentRow, setGetStudentRow] = useState([])
  const [getRowAssessments, setGetRowAssessments] = useState([])

  useEffect(() => {
    axios
      .post('http://localhost:3200/api/verify_authen', {
        token: jwtUsername,
        tokenRole: jwtRole
      })
      .then(data => {
        setUsername(data.data.User)
        setStatus(data.data.stateRole)
      })
    axios.get('http://localhost:3200/api/v1/getevaluatecompany_student').then(res => {
      setGetRowAssessments(res.data.data)
    })
  }, [])

  useEffect(() => {
    if (username !== undefined && status !== undefined) {
      if (status === 'นักศึกษา') {
        axios.post('http://localhost:3200/api/ReadStudent', { username: username }).then(data => {
          if (data.data.length > 0) {
            setStudentData(data.data[0])
            const id = data.data[0].Id
            const filteredObject = getRowAssessments.filter(obj => obj.Id === id)
            setFilterStudent(filteredObject)
          }
        })
      }
    }
  }, [username, status, getRowAssessments])

  const columns = [
    { field: 'ecomstu_order', headerName: 'No', width: 50 },
    { field: 'ecomstu_title', headerName: 'Estimate Title', width: 1350 },
    { field: 'anscom_value', headerName: 'Estimate value', width: 150 }
  ]

  useEffect(() => {
    console.log(filterStudent)
  }, [filterStudent])

  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h5' sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                แสดงประเมินสถานประกอบการ (อาจารย์ประเมินสถานประกอบการ)
              </Typography>
              <DataGrid rows={filterStudent} columns={columns} getRowId={row => row.anstu_id} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShowAssessmentStudent