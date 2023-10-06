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

const ShowAssessmentCom = () => {
  const [getAssesmentCom, setGetAssesmentCom] = useState([])

  const [dataCompany, setDataCompany] = useState([])
  const [filterCompany, setFilterCompany] = useState(getAssesmentCom)

  const handleSelectID = event => {
    setGetData(event.target.value)
  }

  useEffect(() => {
    axios
      .get('http://10.21.45.100:3000/api/v1/companys')
      .then(res => {
        setDataCompany(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://10.21.45.100:3000/api/v1/getevaluate')
      .then(res => {
        setGetAssesmentCom(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const columns = [
    { field: 'ecom_order', headerName: 'No', width: 200 },
    { field: 'ecom_title', headerName: 'Estimate Name', width: 500 },
    { field: 'anstea_value', headerName: 'Estimate value', width: 150 }
  ]

  const [getData, setGetData] = useState([])

  useEffect(() => {
    const filter = getAssesmentCom?.filter(dataID => dataID.com_id === getData)
    setFilterCompany(filter)
  }, [getData, getAssesmentCom])

  useEffect(() => {
    console.log(getData)
  }, [getData])

  // const HandleChange =() =>{
  //   if (type === 'com_id') {
  //     const newStr = event.target.value
  //     setReportData(pre => ({ ...pre, com_id: newStr }))
  //   }
  // }

  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h5' sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                แสดงอาจารย์ประเมินสถานประกอบการ (อาจารย์ประเมินสถานประกอบการ)
              </Typography>

              <Box>
                <Grid item xs={12} sm={6}>
                  <Typography variant='h6' sx={{ p: 2 }}>
                    Establishment
                  </Typography>
                  <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
                    <InputLabel id='dataCompany-label'>Establishment</InputLabel>
                    <Select
                      required
                      labelId='dataCompany-label'
                      id='dataCompany'
                      name='dataCompany'
                      label='dataCompany'
                      onChange={handleSelectID}
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
              <DataGrid rows={filterCompany} columns={columns} getRowId={row => row.anstea_id} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShowAssessmentCom
