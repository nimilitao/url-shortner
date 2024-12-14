import { Toaster } from '../components/ui/sonner'
import { toast } from 'sonner'
import { ThemeProvider } from '../components/themeprovider'
import { useState } from 'react'
import axios from 'axios'
import { ShortUrlForm } from '../components/shortUrlForm'

import '../global.css'

interface FormData {
  original_url: string
  expiration_time: Date
}

type ButtonState = 'static' | 'loading' | 'success' | 'error'

export default function Home() {
  const [buttonState, setButtonState] = useState<ButtonState>('static')
  const postPath: string = `${import.meta.env.VITE_API_BASE_URL}/create`

  const shortUrl = async (formData: FormData) => {
    setButtonState('loading')
    try {
      const response = await axios.post(
        postPath,
        {
          original_url: formData.original_url,
          expiration_time: formData.expiration_time.getTime().toString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus: (status) => status >= 200 && status < 400,
        }
      )

      const shortenedUrl = `${window.location.href}${response.data.code}`

      const toastId = toast.success('URL successfully shortened!', {
        duration: Infinity,
        className: 'border-2 p-4',
        description: `Your shortened URL: ${shortenedUrl}`,
        action: {
          label: 'Copy',
          onClick: () => {
            navigator.clipboard.writeText(shortenedUrl).then(() => {
              toast.dismiss(toastId),
              toast.success('URL copied to clipboard!', {
                className: 'border-2 p-4',
              })
            })
          },
        },
      })

      setButtonState('success')
      setTimeout(() => setButtonState('static'), 2000)
    } catch (error) {
      console.error('Error shortening URL:', error)
      setButtonState('error')
      setTimeout(() => setButtonState('static'), 2000)
    }
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="p-6 max-w-3xl mx-auto mt-16">
        <h1 className="text-3xl font-bold mb-5">Short URL</h1>
        <ShortUrlForm onSubmit={shortUrl} buttonState={buttonState} />
        <Toaster position="bottom-right" />
      </main>
    </ThemeProvider>
  )
}
