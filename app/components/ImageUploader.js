'use client'
import { useEffect, useState } from 'react'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly'

const GoogleDrivePicker = ({ onSelect }) => {
  const [tokenClient, setTokenClient] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [pickerLoaded, setPickerLoaded] = useState(false)

  useEffect(() => {
    const loadScripts = () => {
      // Carregar API do Google Picker
      const script1 = document.createElement('script')
      script1.src = 'https://apis.google.com/js/api.js'
      script1.onload = () => {
        window.gapi.load('client:picker', () => {
          setPickerLoaded(true)
          window.gapi.client.load('drive', 'v3')
        })
      }
      document.body.appendChild(script1)

      // Carregar Google Identity Services
      const script2 = document.createElement('script')
      script2.src = 'https://accounts.google.com/gsi/client'
      script2.onload = () => {
        if (window.google) {
          setTokenClient(
            window.google.accounts.oauth2.initTokenClient({
              client_id: CLIENT_ID,
              scope: SCOPES,
              callback: response => {
                if (response.access_token) {
                  setAccessToken(response.access_token)
                  openPicker(response.access_token)
                }
              },
              prompt: '', // Remove necessidade de consentimento toda vez
            })
          )
        }
      }
      document.body.appendChild(script2)
    }

    loadScripts()
  }, [])

  const openPicker = token => {
    if (!pickerLoaded || !token || !window.google || !window.google.picker)
      return

    const picker = new google.picker.PickerBuilder()
      .addView(google.picker.ViewId.DOCS_IMAGES)
      .setOAuthToken(token)
      .setDeveloperKey(API_KEY)
      .setCallback(pickerCallback)
      .setOrigin(window.location.origin) // Permite que pop-ups venham do mesmo domínio
      .build()

    picker.setVisible(true)
  }

  const pickerCallback = data => {
    if (data.action === window.google.picker.Action.PICKED) {
      const file = data.docs[0]
      const imageUrl = `https://drive.google.com/uc?id=${file.id}`
      onSelect(imageUrl)
    }
  }

  return (
    <button
      type='button'
      onClick={() => tokenClient?.requestAccessToken()}
      className='bg-blue-500 px-4 py-2 rounded'
    >
      Selecionar do Google Drive
    </button>
  )
}

export default GoogleDrivePicker
