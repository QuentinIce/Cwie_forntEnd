// pages/api/download-com-pdf/[fileName].js
import fs from 'fs'
import path from 'path'

export default (req, res) => {
  if (req.method === 'GET') {
    const fileName = req.query.fileName
    const filePath = `public/documents-company/${fileName}.pdf`

    if (fs.existsSync(filePath)) {
      // Set appropriate headers
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`)
      res.setHeader('Content-Type', 'application/pdf')

      // Create a read stream and pipe it to the response
      const fileStream = fs.createReadStream(filePath)
      fileStream.pipe(res)
    } else {
      res.status(404).json({ message: 'File not found' })
    }
  } else {
    res.status(405).end('Method not allowed')
  }
}
