// ** React Imports
import React, { useEffect, useState } from 'react'

// ** axios
import axios from 'axios'

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Typography
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** MDI Imports
import Icon from '@mdi/react'
import { mdiFileDocumentCheckOutline } from '@mdi/js'

// ** Custom Components
import Swal from 'sweetalert2'
import { documentStatus } from 'src/@core/utils/document-status'
import { TabContext, TabList, TabPanel } from '@mui/lab'

const TeacherDocumentPage = ({ semesterYear, documentsCompany }) => {
  const [selectedSemesterYear, setSelectedSemesterYear] = useState(semesterYear[0].lsy_id)
  const [semesterYearData, setSemesterYearData] = useState(semesterYear[0])
  const [documentsData, setDocumentsData] = useState([])
  const [tabValue, setTabValue] = useState(1)

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/getDocumentsForTeacher', {
        semester: semesterYearData.lsy_semester,
        year: semesterYearData.lsy_year
      })

      const data = response.data.results.filter(item => {
        return item.doc_version === 3 || item.doc_version === 4
      })
      setDocumentsData(data)
    } catch (error) {
      console.log('Error fetching data:', error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'An error occurred while fetching documents',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const handleSelectedSemesterYearChange = event => {
    setSelectedSemesterYear(event.target.value)
    const selectedSemesterYearData = semesterYear.find(item => item.lsy_id === event.target.value)
    setSemesterYearData(selectedSemesterYearData)
  }

  const handleUploadFile = async (event, id, stu_id, doc_type, semester, year) => {
    try {
      const file = event.target.files[0]

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
        student_id: id,
        doc_filename: `${stu_id}_Document_${doc_type}.pdf`,
        doc_filepath: 'public/documents/',
        doc_type: doc_type,
        doc_version: 4
      }

      console.log('uploadFile: ', uploadFile)

      // ** API Backend
      const resApiBackend = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/uploadFileTeacher`,
        uploadFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
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
      console.log('resApiFrontend: ', resApiFrontend)

      if (resApiFrontend.status === 200 && resApiBackend.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Upload file success',
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            fetchData()
          }
        })
      } else {
        displayError('Upload file error')
      }
    } catch (error) {
      console.error('An error occurred during the upload:', error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'An unexpected error occurred',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  // ? สำหรับเอกสารนักศึกษา
  const handleDownloadFile = async (stu_code, doc_type) => {
    try {
      const fileName = `${stu_code}_Document_${doc_type}`

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

  // ? สำหรับเอกสารสถานประกอบการ
  const handleDownloadFileCompany = async fileName => {
    try {
      // ** API Frontend
      // Send a GET request to the download URL
      const response = await axios.get(`/api/download-com-pdf/${fileName}`, {
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

  const columns = [
    {
      field: 'stu_id',
      headerName: 'code',
      width: 150,
      editable: false
    },
    {
      field: 'student_name',
      headerName: 'Name',
      width: 300,
      editable: false,
      renderCell: params => {
        const studentName = `${params.row.stu_name} ${params.row.stu_lname}`

        return <div>{studentName}</div>
      }
    },
    {
      field: 'doc_type',
      headerName: 'Doc No.',
      width: 80,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 300,
      editable: false,
      renderCell: params => {
        const status = documentStatus(params.row.doc_version)

        return <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{status.text}</div>
      }
    },
    {
      field: 'upload',
      headerName: 'Upload',
      width: 130,
      editable: false,
      renderCell: params => (
        <Button variant='contained' component='label' size='small'>
          Upload File
          <input
            type='file'
            hidden
            onChange={event =>
              handleUploadFile(
                event,
                params.row.Id,
                params.row.stu_id,
                params.row.doc_type,
                params.row.doc_semester,
                params.row.doc_year
              )
            }
          />
        </Button>
      )
    },
    {
      field: 'download',
      headerName: 'Download',
      width: 130,
      editable: false,
      renderCell: params => (
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={() => handleDownloadFile(params.row.stu_id, params.row.doc_type)}
        >
          Download
        </Button>
      )
    }
  ]

  const columnsCompany = [
    {
      field: 'ad_id',
      headerName: 'ID',
      width: 100,
      editable: false
    },
    {
      field: 'com_name',
      headerName: 'Company Name',
      width: 300,
      editable: false
    },
    {
      field: 'ad_filename',
      headerName: 'File Name',
      width: 300,
      editable: false
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 200,
      editable: false,
      renderCell: params => {
        const date = new Date(params.value).toLocaleDateString()
        const time = new Date(params.value).toLocaleTimeString()

        return `${date} ${time}`
      }
    },
    {
      field: 'download',
      headerName: 'Download',
      width: 200,
      editable: false,
      renderCell: params => {
        return (
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => handleDownloadFileCompany(params.row.ad_filename)}
          >
            Download
          </Button>
        )
      }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      console.log(semesterYearData.lsy_semester, '/', semesterYearData.lsy_year)
      try {
        const response = await axios.post('http://localhost:3000/api/getDocumentsForTeacher', {
          semester: semesterYearData.lsy_semester,
          year: semesterYearData.lsy_year
        })

        const data = response.data.results.filter(item => {
          return item.doc_version === 3 || item.doc_version === 4
        })

        setDocumentsData(data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetchData()
  }, [semesterYearData])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box>
      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', m: 3 }}>
            <Icon path={mdiFileDocumentCheckOutline} size={6} />
            <Box sx={{ ml: 2 }}>
              <Typography variant='h4'>Document for Registration Officers</Typography>
              <Typography variant='h6'>Download document and Upload Document sign Co-operative</Typography>
            </Box>
          </Box>
          <Divider />
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
                <Tab label='เอกสารนักศึกษา' value={1} />
                <Tab label='เอกสารสถานประกอบ' value={2} />
              </TabList>
            </Box>
            <TabPanel value={1}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: 6 }}>
                <Typography variant='h6' sx={{ px: 2 }}>
                  เลือกปีการศึกษาที่ต้องการ
                </Typography>
                <FormControl sx={{ maxWidth: 300 }}>
                  <Select
                    id='select-semester-year'
                    value={selectedSemesterYear}
                    onChange={handleSelectedSemesterYearChange}
                  >
                    {semesterYear.map(item => (
                      <MenuItem value={item.lsy_id} key={item.lsy_id}>
                        {item.lsy_semester}/{item.lsy_year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {documentsData.length === 0 ? (
                <Box sx={{ p: 6 }}>
                  <Typography variant='h6'>ไม่มีเอกสารในปีการศึกษานี้</Typography>
                </Box>
              ) : (
                <Box sx={{ p: 6 }}>
                  <DataGrid rows={documentsData} columns={columns} getRowId={row => row.doc_id} />
                </Box>
              )}
            </TabPanel>
            <TabPanel value={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: 6 }}>
                <DataGrid rows={documentsCompany} columns={columnsCompany} getRowId={row => row.ad_id} />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </Box>
  )
}

// ssr
export async function getServerSideProps() {
  try {
    const resAllSemesterYear = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/getAllSemesterYear`)
    const semesterYear = resAllSemesterYear.data.results

    const resAllDocumentsCompany = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/getFileCompanyForOfficer`
    )
    const documentsCompany = resAllDocumentsCompany.data.data

    return {
      props: {
        semesterYear: semesterYear || [],
        documentsCompany: documentsCompany || []
      }
    }
  } catch (error) {
    console.error('Error fetching semesterYear data:', error)

    return {
      props: {
        semesterYear: [],
        documentsCompany: []
      }
    }
  }
}

export default TeacherDocumentPage
