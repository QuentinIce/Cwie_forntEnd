// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import Cookies from 'js-cookie'
import axios from 'axios'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // -------------------- getCookie
  const username = Cookies.get('._jwtUsername')
  const role = Cookies.get('._jwtRole')

  // ===============================

  const [user, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [showname, setShowname] = useState('')
  const [showstatus, setShowstate] = useState('')

  // console.log(Cookies.get('._jwtUsername'))
  console.log(role)

  useEffect(() => {
    axios
      .post('http://localhost:3200/api/verify_authen', {
        token: username,
        tokenRole: role
      })
      .then(data => {
        setUsername(data.data.User)
        setStatus(data.data.stateRole)
      })
  }, [])

  console.log('xx', user)

  useEffect(() => {
    if (user !== undefined && status !== undefined) {
      if (status === 'นักศึกษา') {
        axios.post('http://localhost:3200/api/ReadStudent', { username: user }).then(data => {
          if (data.data.length > 0) {
            const setFristName = data.data[0].stu_name
            setShowname(setFristName)
            setShowstate(status)
          }
        })
      }
      if (status === 'อาจารย์') {
        axios.post('http://localhost:3200/api/ReadTeacher', { username: user }).then(data => {
          if (data.data.length > 0) {
            const setFristName = data.data[0].tea_name
            setShowname(setFristName)
            setShowstate(status)
          }
        })
      }
      if (status === 'เจ้าหน้าที่') {
        axios.post('http://localhost:3200/api/Readofficer', { username: user }).then(data => {
          if (data.data.length > 0) {
            const setFristName = data.data[0].off_name
            setShowname(setFristName)
            setShowstate(status)
          }
        })
      }
      if (status === 'สถานประกอบการ') {
        axios.post('http://localhost:3200/api/Read_Company', { username: user }).then(data => {
          if (data.data.length > 0) {
            const setFristName = data.data[0].com_name
            setShowname(setFristName)
            setShowstate(status)
          }
        })
      }
    }
  }, [user, status])

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleDropdownCloselogout = url => {
    Cookies.remove('._jwtUsername', { path: '/' })
    Cookies.remove('._jwtRole', { path: '/' })
    router.push(url)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{showname}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {showstatus}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/cwie/profile')}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}></MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}></MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownCloselogout('/')}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
