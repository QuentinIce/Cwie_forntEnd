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

const TeacherDocumentPage = ({ semesterYear }) => {
  const [semesterYearData, setSemesterYearData] = useState(semesterYear[0])
  const [documentsData, setDocumentsData] = useState([])
  const [dataCompany, setDataCompany] = useState([])

  // ! dummy data
  const com_id = 1

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/getCompanyById`, {
        com_id: com_id
      })
      .then(res => {
        setDataCompany(res.data.data[0])
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/getDocumentsReply`, {
        com_id: 1
      })

      const data = response.data.data

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

  const handleUploadFile = async event => {
    try {
      const file = event.target.files[0]
      const now = new Date()
      const currentDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`
      const formattedDate = currentDate.replace(/:/g, '-').replace(/ /g, '_')

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

      // ? รอดึงข้อมูลสถานประกอบการ
      const uploadFile = {
        company_id: dataCompany.com_id,
        ad_filename: `Document_${dataCompany.com_id}_${formattedDate}`,
        ad_filepath: 'public/documents-company/'
      }

      const formData = new FormData()
      formData.append('pdf', file)
      formData.append('newName', uploadFile.ad_filename)

      // ** API Backend
      const resApiBackend = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/sendDocumentsReply`,
        uploadFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      const resApiFrontend = await axios.post('/api/upload-com', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

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

  const handleDownloadFile = async fileName => {
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
      field: 'ad_id',
      headerName: 'ID',
      width: 100,
      editable: false
    },
    {
      field: 'ad_filename',
      headerName: 'File Name',
      width: 200,
      editable: false
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 300,
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
            onClick={() => handleDownloadFile(params.row.ad_filename)}
          >
            Download
          </Button>
        )
      }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/getDocumentsReply`, {
          com_id: 1
        })

        const data = response.data.data

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

    fetchData()
  }, [])

  return (
    <Box>
      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', m: 3 }}>
            <Icon path={mdiFileDocumentCheckOutline} size={6} />
            <Box sx={{ ml: 2 }}>
              <Typography variant='h4'>Document for Establishment</Typography>
              <Typography variant='h6'>Download document and Upload Document sign Co-operative</Typography>
            </Box>
          </Box>
          <Divider />

          <Box sx={{ display: 'flex', alignItems: 'center', px: 6, pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button variant='contained' color='primary' component='label' size='medium'>
                  <input type='file' hidden onChange={handleUploadFile} />
                  Upload File Document
                </Button>
              </Grid>
            </Grid>
          </Box>
          {documentsData.length === 0 ? (
            <Box sx={{ p: 6 }}>
              <Typography variant='h6'>ไม่มีเอกสารในปีการศึกษานี้</Typography>
            </Box>
          ) : (
            <Box sx={{ p: 6 }}>
              <DataGrid rows={documentsData} columns={columns} getRowId={row => row.ad_id} />
            </Box>
          )}
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

    return {
      props: {
        semesterYear: semesterYear || [] // Provide a default value (empty array) if semesterYear is falsy
      }
    }
  } catch (error) {
    console.error('Error fetching semesterYear data:', error)

    return {
      props: {
        semesterYear: [] // Provide a default value in case of an error
      }
    }
  }
}

export default TeacherDocumentPage
