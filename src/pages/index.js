// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import axios from 'axios'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
// import cookieCutter from 'cookie-cutter'
const now = new Date()

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    Cookies.set('jwtUsername', '', { expires: new Date(0) }) //ใช้เพื่อกำหนดเวลาให้คุกกี้หมดเวลา
    Cookies.set('jwtRole', '', { expires: new Date(0) })
  }, [])

  const handleDropdownCloselogout = url => {
    if (url) {
      router.push(url)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ zIndex: 1, width: '80%', maxWidth: 400 }}>
          <CardContent sx={{ padding: `${theme.spacing(5)} !important` }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                <Button sx={{ py: 5, textTransform: 'none' }} onClick={() => handleDropdownCloselogout('/login')}>
                  Login (Student) 👋🏻
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ zIndex: 1, width: '80%', maxWidth: 400 }}>
          <CardContent sx={{ padding: `${theme.spacing(5)} !important` }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                <Button
                  sx={{ py: 5, textTransform: 'none' }}
                  onClick={() => handleDropdownCloselogout('/login_teacher')}
                >
                  Login (Teacher) 👋🏻
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ zIndex: 1, width: '80%', maxWidth: 400 }}>
          <CardContent sx={{ padding: `${theme.spacing(5)} !important` }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                <Button
                  sx={{ py: 5, textTransform: 'none' }}
                  onClick={() => handleDropdownCloselogout('/login_admin')}
                >
                  Login (Admin) 👋🏻
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ zIndex: 1, width: '80%', maxWidth: 400 }}>
          <CardContent sx={{ padding: `${theme.spacing(5)} !important` }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                <Button
                  sx={{ py: 5, textTransform: 'none' }}
                  onClick={() => handleDropdownCloselogout('/login_company')}
                >
                  Login (Company) 👋🏻
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
