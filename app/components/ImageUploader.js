'use client'
import { useEffect, useState } from 'react'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly'

const GoogleDrivePicker = ({ setImages }) => {
  const [tokenClient, setTokenClient] = useState(null)
  const [accessToken, setAccessToken] = useState(
    typeof window !== 'undefined'
      ? sessionStorage.getItem('access_token')
      : null
  )
  const [pickerLoaded, setPickerLoaded] = useState(false)

  useEffect(() => {
    const loadScripts = () => {
      const script1 = document.createElement('script')
      script1.src = 'https://apis.google.com/js/api.js'
      script1.onload = () => {
        window.gapi.load('client:picker', () => {
          setPickerLoaded(true)
          window.gapi.client.load('drive', 'v3')
        })
      }
      document.body.appendChild(script1)

      const script2 = document.createElement('script')
      script2.src = 'https://accounts.google.com/gsi/client'
      script2.onload = () => {
        if (window.google) {
          const client = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            prompt: accessToken ? '' : 'consent',
            callback: response => {
              if (response.access_token) {
                sessionStorage.setItem(
                  'access_token',
                  response.access_token
                )
                setAccessToken(response.access_token)
                openPicker(response.access_token)
              }
            },
          })
          setTokenClient(client)
        }
      }
      document.body.appendChild(script2)
    }

    loadScripts()
  }, [accessToken])

  const openPicker = token => {
    if (!pickerLoaded || !token || !window.google || !window.google.picker)
      return

    const picker = new google.picker.PickerBuilder()
      .addView(google.picker.ViewId.DOCS_IMAGES)
      .enableFeature(google.picker.Feature.MULTISELECT_ENABLED) // Permite seleção múltipla
      .setOAuthToken(token)
      .setDeveloperKey(API_KEY)
      .setMaxItems(8) // Garante que no máximo 8 arquivos sejam selecionados
      .setCallback(pickerCallback)
      .setOrigin(window.location.origin)
      .build()

    picker.setVisible(true)
  }

  const pickerCallback = data => {
    if (data.action === window.google.picker.Action.PICKED) {
      let files = data.docs.slice(0, 8) // Garante no máximo 8 imagens
      const imageUrls = files.map(
        file => `https://drive.google.com/uc?id=${file.id}`
      )
      setImages(prevImages => [...prevImages, ...imageUrls])
    }
  }

  const handleClick = () => {
    if (accessToken) {
      openPicker(accessToken)
    } else {
      tokenClient?.requestAccessToken()
    }
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className='bg-blue-500 px-4 py-2 rounded'
    >
      Selecionar do Google Drive
    </button>
  )
}

export default GoogleDrivePicker
