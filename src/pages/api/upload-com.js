import multer from 'multer'
import fs from 'fs'
import path from 'path'

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/documents-company/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.pdf')
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 } // Limit file size to 5MB
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req, res) => {
  if (req.method === 'POST') {
    upload.single('pdf')(req, res, function (err) {
      if (err) {
        console.log('Error in multer:', err)

        return res.status(500).json({ error: err.message })
      }

      const newName = req.body.newName

      if (!newName) {
        return res.status(400).json({ message: 'Please provide a new name' })
      }

      const oldPath = req.file.path
      const newPath = `public/documents-company/${newName}.pdf`

      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          return res.status(500).json({ error: 'Could not rename file', details: err.message })
        }

        return res.status(200).json({ message: 'File uploaded successfully' })
      })
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}
