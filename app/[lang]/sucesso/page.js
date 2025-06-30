'use client'
import Image from 'next/image'
import { useParams, useSearchParams } from 'next/navigation'
import Button from '@/app/components/Button'
import downloadReceita from '@/services/downloadReceita'
import sendEmail from '@/services/sendEmail'
import { useEffect } from 'react'

// Traduções
const messages = {
  'pt-br': {
    title: 'Obrigada por comprar na Mirumuh!',
    description:
      'Clique no botão de download ou verifique seu e-mail para confirmar o recebimento do PDF.',
    buttonLabel: 'Download',
  },
  us: {
    title: 'Thank you for shopping at Mirumuh!',
    description:
      'Click the download button or check your email to confirm receipt of the PDF.',
    buttonLabel: 'Download',
  },
}

const Sucesso = () => {
  const { lang } = useParams()
  const searchParams = useSearchParams()
  const encodedRecipeName = searchParams.get('recipe_name')
  const encodedEmail = searchParams.get('email')

  const content = messages[lang] || messages['pt-br']

  const decode = encodedText => {
    const decodedData = atob(encodedText)
    const decoder = new TextDecoder()
    const byteArray = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; i++) {
      byteArray[i] = decodedData.charCodeAt(i)
    }
    return decoder.decode(byteArray)
  }

  const recipeName = decode(encodedRecipeName)

  const cleanRecipeName = name => {
    return name.replace(/_/g, ' ').replace('.pdf', '')
  }

  const cleanedRecipeName = cleanRecipeName(recipeName)

  const removeAccents = str => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const recipeNameWithoutAccents = removeAccents(recipeName)

  const fileIds = [
    `PTBR_${recipeNameWithoutAccents}`,
    `EN_${recipeNameWithoutAccents}`,
  ]

  const downloadPDF = async () => {
    try {
      const zipBlob = await downloadReceita(fileIds)

      const url = window.URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Receitas_Mirumuh_${recipeNameWithoutAccents}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download PDF:', error)
    }
  }

  useEffect(() => {
    const sendEmailTo = async () => {
      const emailKey = `emailSent_${recipeNameWithoutAccents}`
      const emailSent = sessionStorage.getItem(emailKey)

      if (!emailSent) {
        try {
          const fileIds = [
            `PTBR_${recipeNameWithoutAccents}`,
            `EN_${recipeNameWithoutAccents}`,
          ]

          const data = {
            recipient: encodedEmail,
            subject: `Receita ${cleanedRecipeName}`,
            body: 'Segue anexa a receita do amigurumi.',
            file_id: fileIds,
          }

          await sendEmail(data)
          sessionStorage.setItem(emailKey, 'true')
        } catch (error) {
          console.error('Erro ao enviar email com os PDFs:', error)
        }
      }
    }

    sendEmailTo()
  }, [encodedEmail, recipeName, recipeNameWithoutAccents])

  return (
    <div className='w-full h-screenHeader overflow-y-auto py-10 px-5 lg:py-8 lg:px-96 flex items-center justify-center'>
      <div className='bg-white rounded-3xl shadow-lg flex gap-6 justify-center items-center py-5 px-6 md:px-8'>
        <div className='flex'>
          <Image
            src={'/icons/logo_marcado.png'}
            alt={'Icone da Mirumuh'}
            width={300}
            height={300}
          />
        </div>
        <div className='flex flex-col justify-center items-center gap-6 px-10'>
          <div className='flex justify-center items-center'>
            <h2 className='text-[22px] font-semibold'>{content.title}</h2>
          </div>
          <div className='flex justify-center items-center '>
            <p className='text-[16px] text-justify'>
              {content.description}
            </p>
          </div>
          <Button
            label={content.buttonLabel}
            variant={'brown'}
            onClick={downloadPDF}
          />
        </div>
      </div>
    </div>
  )
}

export default Sucesso
