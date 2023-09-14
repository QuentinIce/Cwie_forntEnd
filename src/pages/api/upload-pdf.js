import multer from 'multer'
import fs from 'fs'
import path from 'path'

const upload = multer({ dest: 'public/documents/' })

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req, res) => {
  if (req.method === 'PUT') {
    upload.single('pdf')(req, res, function (err) {
      if (err) {
        console.log('Error in multer:', err)

        return res.status(500).json({ error: err.message })
      }

      const { originalname, path: filePath } = req.file
      const newName = req.body.name

      if (!newName) {
        return res.status(400).json({ message: 'กรุณาใส่ชื่อ' })
      }

      const newPath = `public/documents/${newName}.pdf`

      fs.rename(filePath, newPath, err => {
        if (err) {
          console.error('เกิดข้อผิดพลาดในการย้ายไฟล์:', err)

          return res.status(500).send('เกิดข้อผิดพลาดในการอัปโหลดไฟล์')
        }

        return res.status(200).json({ message: 'อัปโหลดไฟล์ PDF เรียบร้อยแล้ว' })
      })
    })
  } else {
    res.status(405).end('Method not allowed')
  }
}
