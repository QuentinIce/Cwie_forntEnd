// ** React Imports
import React, { useEffect, useState } from 'react'

// ** axios
import axios from 'axios'

// ** MUI Imports
import { Box, Button, Card, Chip, Divider, FormControl, Grid, MenuItem, Tab, Typography, Select } from '@mui/material'

// ** MDI Imports
import Icon from '@mdi/react'
import { mdiFileDocumentCheckOutline } from '@mdi/js'

// ** Custom Components
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { documentStatus } from 'src/@core/utils/document-status'

const StudentDocumentPage = ({ documentStudent, lastedSemesterYear, establishment }) => {
  const [dataStudent, setDataStudent] = useState([])
  const [dataFile, setDataFile] = useState(documentStudent)
  const [selectCompany, setSelectCompany] = useState('')

  useEffect(() => {
    const jwtUsername = Cookies.get('._jwtUsername')
    const dataJwt = { username: jwtUsername }
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/getDataStudent`, dataJwt)
      .then(res => {
        setDataStudent(res.data.data[0])
      })
      .catch(err => {
        console.log('err1: ', err)
      })
  }, [])

  const getFilesStudent = async student_id => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/getFileStudent`, { student_id: student_id })
      .then(res => {
        const company = establishment.find(item => item.com_id === res.data.data[0].company_id)

        setDataFile(dataFile =>
          dataFile.map(item => {
            const matchingDoc = res.data.data.find(doc => doc.doc_type === item.id)

            return matchingDoc
              ? {
                  ...item,
                  fileName: matchingDoc.doc_filename,
                  status: matchingDoc.doc_version,
                  company: company.com_name
                }
              : item
          })
        )
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }

  useEffect(() => {
    getFilesStudent(dataStudent.Id)
  }, [dataStudent])

  //  ** อัพโหลดไฟล์ PDF
  const handleFileUpload = async (e, typeID) => {
    const file = e.target.files[0]

    const displayError = message => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    }

    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      displayError('กรุณาอัพโหลดไฟล์ PDF')

      return // Stop execution if it's not a PDF
    }

    console.log('file: ', file)

    // ? รอดึงข้อมูลนักศึกษา
    const uploadFile = {
      student_id: dataStudent.Id,
      company_id: selectCompany,
      doc_filename: `${dataStudent.stu_id}_Document_${typeID}.pdf`,
      doc_filepath: 'public/documents/',
      doc_semester: lastedSemesterYear.lsy_semester,
      doc_year: lastedSemesterYear.lsy_year,
      doc_type: typeID,
      doc_version: 1
    }

    // ** API Backend
    const resApiBackend = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/uploadFile`, uploadFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('resApiBackend: ', resApiBackend)

    // ? ต้องรัน server.js ก่อน
    const formData = new FormData()
    formData.append('pdf', file)
    formData.append('name', uploadFile.doc_filename)

    // ** API Frontend
    const resApiFrontend = await fetch('/api/upload-pdf', {
      method: 'PUT',
      body: formData
    })

    if (resApiFrontend.status === 200 && resApiBackend.status === 200) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Upload file success',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Upload file error',
        showConfirmButton: false,
        timer: 1500
      })
    }

    getFilesStudent(dataStudent.Id)
  }

  const handleFileDownload = async typeID => {
    try {
      const fileName = `${dataStudent.stu_id}_Document_${typeID}`

      console.log('fileName: ', fileName)

      // ** API Frontend
      // Send a GET request to the download URL
      const response = await axios.get(`/api/download-pdf/${fileName}.pdf`, {
        responseType: 'blob' // Specify the response type as 'blob' to handle binary data (PDF)
      })

      if (response.status === 200) {
        // Create a Blob from the response data
        const fileBlob = new Blob([response.data], { type: 'application/pdf' })

        // Create a temporary URL for the Blob
        const fileUrl = window.URL.createObjectURL(fileBlob)

        // Create an anchor element for downloading the file
        const downloadLink = document.createElement('a')
        downloadLink.href = fileUrl

        // Set the file name for the downloaded file
        downloadLink.download = `${fileName}.pdf`

        // Trigger a click event to initiate the download
        downloadLink.click()

        // Release the URL object
        window.URL.revokeObjectURL(fileUrl)
      } else if (response.status === 404) {
        // Handle the case where the file was not found
        console.error('File not found')
      } else {
        // Handle other error cases
        console.error('Error downloading file')
      }
    } catch (error) {
      // Handle any errors that may occur during the download process
      console.error('Error:', error)
    }
  }

  const handleStatusValueChangeToText = statusValue => {
    const status = documentStatus(statusValue)

    return status.text
  }

  const handleChipColor = statusValue => {
    const status = documentStatus(statusValue)

    return status.color
  }

  const handleCompanyChange = e => {
    setSelectCompany(e.target.value)
  }

  if (dataFile.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Icon path={mdiFileDocumentCheckOutline} size={6} />
            <Box sx={{ ml: 2 }}>
              <Typography variant='h4'>Document</Typography>
              <Typography variant='h6'>นักศึกษานำเอกสารเหล่านี้มาให้ อ.ตั้ม เซ็นต์อนุมัติโครงการ</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', p: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Typography variant='h6' sx={{ px: 2 }}>
                ปีการศึกษาที่เปิดให้ลงทะเบียน: {lastedSemesterYear.lsy_semester}/{lastedSemesterYear.lsy_year}
              </Typography>
              <FormControl sx={{ maxWidth: 500 }}>
                <Typography variant='h6' sx={{ px: 2 }}>
                  เลือกสถานประกอบการ
                </Typography>
                <Select value={selectCompany} onChange={handleCompanyChange}>
                  {establishment.map(item => (
                    <MenuItem key={item.com_id} value={item.com_id}>
                      {item.com_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Divider />
          <Box sx={{ p: 4 }}>
            <Grid container justifyContent='center' alignItems='center'>
              {dataFile.map(item => (
                <Grid
                  item
                  xs={12}
                  key={item.id}
                  sx={{ border: '1px solid #ccc', borderRadius: '10px', bgcolor: '#f5f5f5', marginBlock: 1, p: 2 }}
                >
                  <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item xs={5}>
                      <Typography variant='subtitle1' sx={{ fontSize: 16 }}>
                        อัพโหลดเอกสาร {item.name}
                      </Typography>

                      <Typography variant='subtitle1' noWrap>
                        ชื่อไฟล์: {item.fileName ? item.fileName : 'ยังไม่ได้อัพโหลดไฟล์'}
                      </Typography>

                      <Typography variant='subtitle1' noWrap>
                        ชื่อสถานประกอบการ: {item.company ? item.company : 'ยังไม่ได้เลือกสถานประกอบการ '}
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {item.status !== 0 && (
                        <Chip
                          label={handleStatusValueChangeToText(item.status)}
                          color={handleChipColor(item.status)}
                          variant='outlined'
                        />
                      )}
                      <Button
                        variant='contained'
                        component='label'
                        sx={{ mx: 1, maxWidth: 100 }}
                        disabled={item.status > 2 ? true : false}
                      >
                        Upload File
                        <input type='file' hidden onChange={e => handleFileUpload(e, item.id)} />
                      </Button>
                      <Button variant='contained' onClick={() => handleFileDownload(item.id)} sx={{ maxWidth: 100 }}>
                        Download File
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

// SSR
export async function getServerSideProps() {
  const documentStudent = [
    {
      id: 1,
      name: 'สก.วศ.01_ฟอร์มโครงการพัฒนาทักษะวิชาชีพ',
      file: null,
      fileName: '',
      status: 0,
      company: ''
    },
    {
      id: 2,
      name: 'สก.วศ.02_ใบสมัครข้อมูลนักศึกษา',
      file: null,
      fileName: '',
      status: 0,
      company: ''
    },
    {
      id: 3,
      name: 'ใบทรานสคริปนักศึกษา (ภาษาอังกฤษ)',
      file: null,
      fileName: '',
      status: 0,
      company: ''
    },
    {
      id: 4,
      name: 'สำเนาบัตรประชาชน (ลงนามเรียบร้อย)',
      file: null,
      fileName: '',
      status: 0,
      company: ''
    }
  ]

  // ** Get lasted semester year
  const resSemesterYear = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/getSemesterYear`)
  const lastedSemesterYear = resSemesterYear.data.results[0]

  const resCompany = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/companys`)
  const establishment = resCompany.data.data

  return {
    props: { documentStudent, lastedSemesterYear, establishment }
  }
}

export default StudentDocumentPage
