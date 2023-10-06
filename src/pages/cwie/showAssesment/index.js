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

const ShowAssessment = () => {
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
      .post('http://10.21.45.100:3000/api/verify_authen', {
        token: jwtUsername,
        tokenRole: jwtRole
      })
      .then(data => {
        setUsername(data.data.User)
        setStatus(data.data.stateRole)
      })
    axios.get('http://10.21.45.100:3000/api/v1/getevaluatestudent').then(res => {
      console.log('go')
      setGetRowAssessments(res.data.data)
    })
  }, [jwtUsername, jwtRole])

  useEffect(() => {
    if (username !== undefined && status !== undefined) {
      if (status === 'นักศึกษา') {
        axios.post('http://10.21.45.100:3000/api/ReadStudent', { username: username }).then(data => {
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
    { field: 'estu_order', headerName: 'No', width: 100 },
    { field: 'estu_title', headerName: 'Estimate Title', width: 800 },
    { field: 'anstu_value', headerName: 'Estimate value', width: 150 }
  ]

  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h5' sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                แสดงประเมินนักศึกษา (อาจารย์ประเมินนักศึกษา)
              </Typography>
              <DataGrid rows={filterStudent} columns={columns} getRowId={row => row.anstu_id} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShowAssessment
