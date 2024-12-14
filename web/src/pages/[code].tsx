import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner } from '../components/spinner'

export default function RedirectPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      if (!code) return

      try {
        if (code) {
          const redirectToOriginalUrl = (code: string) => {
            window.location.replace(
              `${import.meta.env.VITE_API_BASE_URL}${code}`
            )
          }

          redirectToOriginalUrl(code)
        } else {
          console.error('original URL not found')
          navigate('/notfound')
        }
      } catch (error) {
        console.error('Error when fetching original URL', error)
        navigate('/notfound')
      }
    }

    redirectToOriginalUrl()
  }, [code, navigate])

  return (
    <div className="mt-36  flex flex-col items-center justify-center">
      <p className="text-xl mb-8">Redirecting</p>
      <Spinner />
    </div>
  )
}
