import JSZip from 'jszip'

async function unzipBlob(blob) {
  const zip = await JSZip.loadAsync(blob)
  const files = Object.keys(zip.files)

  const pdfs = await Promise.all(
    files.map(async name => {
      const content = await zip.file(name).async('blob')
      return new File([content], name, { type: 'application/pdf' })
    })
  )

  return pdfs
}

export default unzipBlob
