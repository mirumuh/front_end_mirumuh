import Stripe from 'stripe'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false, // Desativa o parsing automático
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const form = new formidable.IncomingForm()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao processar arquivo' })
    }

    const file = files.file[0]
    const fileStream = fs.createReadStream(file.filepath)

    try {
      const stripeFile = await stripe.files.create({
        file: {
          data: fileStream,
          name: file.originalFilename,
          type: file.mimetype,
        },
        purpose: 'business_icon', // Ajuste conforme necessário
      })

      return res.json({ success: true, fileUrl: stripeFile.url })
    } catch (error) {
      console.error('Erro no upload:', error)
      return res
        .status(500)
        .json({ error: 'Erro ao enviar arquivo para a Stripe' })
    }
  })
}
