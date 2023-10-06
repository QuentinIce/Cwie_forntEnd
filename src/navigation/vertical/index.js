// ** React Imports
import { useEffect, useState } from 'react'

// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ChevronDoubleRight from 'mdi-material-ui/ChevronDoubleRight'
import BlindIcon from '@mui/icons-material/Blind'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import Cookies from 'js-cookie'
import axios from 'axios'

const Navigation = () => {
  // -------------------- getCookie
  const username = Cookies.get('jwtUsername')
  const role = Cookies.get('jwtRole')

  // ===============================

  const [status, setStatus] = useState('')

  useEffect(() => {
    axios
      .post('http://localhost:3000/api/verify_authen', {
        token: username,
        tokenRole: role
      })
      .then(data => {
        setStatus(data.data.stateRole)
      })
  }, [])

  console.log('ss', status)

  let menuItems = [
    {
      title: 'Home Page',
      icon: HomeOutline,
      path: '/Home'
    }
  ]

  if (status === 'นักศึกษา') {
    menuItems.push(
      {
        sectionTitle: 'CWIE'
      },
      {
        title: 'Document Student',
        icon: ChevronDoubleRight,
        path: '/student/student-documents',
        openInNewTab: false
      },
      {
        title: 'Report Student',
        icon: ChevronDoubleRight,
        path: '/report_weeklyStudent'
      },
      {
        title: 'Supervision Student',
        icon: ChevronDoubleRight,
        path: '/supervisionStudent'
      },
      {
        title: 'ประเมินนักศึกษา (สถานประกอบการประเมินนักศึกษา)',
        icon: AccessibilityNewIcon,
        path: '/cwie/showAssessmentStudent'
      },
      {
        title: 'ประเมินนักศึกษา (อาจารย์ประเมินนักศึกษา)',
        icon: AccessibilityNewIcon,
        path: '/cwie/showAssesment'
      }
    )
  } else if (status === 'อาจารย์') {
    menuItems.push(
      {
        sectionTitle: 'CWIE'
      },
      {
        title: 'Document Teacher',
        icon: ChevronDoubleRight,
        path: '/teacher/teacher-documents',
        openInNewTab: false
      },
      {
        title: 'Report for Teacher',
        icon: ChevronDoubleRight,
        path: '/report_weeklyTeacher'
      },
      {
        title: 'Supervision Teacher',
        icon: ChevronDoubleRight,
        path: '/supervisionTeacher'
      },
      {
        title: 'Supervision Student',
        icon: ChevronDoubleRight,
        path: '/supervisionStudent_list'
      },
      {
        title: 'แบบประเมิน(อาจารย์ประเมินบริษัท)',
        icon: AccessibilityNewIcon,
        path: '/cwie/assessmentcom'
      },
      {
        title: 'แบบประเมิน(อาจารย์ประเมินนักศึกษา)',
        icon: AccessibilityNewIcon,
        path: '/cwie/assessment'
      },
      {
        title: 'แสดงแบบประเมิน(อาจารย์ประเมินบริษัท)',
        icon: AccessibilityNewIcon,
        path: '/cwie/showAssessmentCom'
      }
    )
  } else if (status === 'สถานประกอบการ') {
    menuItems.push(
      {
        sectionTitle: 'CWIE'
      },
      {
        title: 'Document Establishment',
        icon: ChevronDoubleRight,
        path: '/establishment/establishment-documents',
        openInNewTab: false
      },
      {
        title: 'Report for Establishment',
        icon: ChevronDoubleRight,
        path: '/report_weeklyEstablishment'
      },
      {
        title: 'Supervision Establishment',
        icon: ChevronDoubleRight,
        path: '/supervisionEstablishment'
      },
      {
        title: 'ประเมินนักศึกษา (สถานประกอบการประเมินนักศึกษา)',
        icon: AccessibilityNewIcon,
        path: '/cwie/assessmentstudent'
      }
    )
  } else if (status === 'เจ้าหน้าที่') {
    menuItems.push(
      {
        sectionTitle: 'CWIE'
      },
      {
        title: 'Document Officer',
        icon: ChevronDoubleRight,
        path: '/registry-office/registry-documents',
        openInNewTab: false
      },

      {
        sectionTitle: 'Back Office'
      },
      {
        title: 'Student Management',
        icon: ChevronDoubleRight,
        path: '/bo_Student_manage'
      },
      {
        title: 'Teacher Management',
        icon: ChevronDoubleRight,
        path: '/bo_Teacher_manage'
      },
      {
        title: 'Establishment Management',
        icon: ChevronDoubleRight,
        path: '/bo_Establishment_manage'
      },
      {
        title: 'Supervision Establishment',
        icon: ChevronDoubleRight,
        path: '/bo_SupervisionES'
      },
      {
        title: 'Supervision Teacher',
        icon: ChevronDoubleRight,
        path: '/bo_SupervisionTC'
      },
      {
        title: 'NEWS Management',
        icon: ChevronDoubleRight,
        path: '/Backoffice_NEWS'
      }
    )
  }

  return menuItems
}

export default Navigation
