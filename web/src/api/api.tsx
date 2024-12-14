import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_BASE_URL

export const createShortenedUrl = async (originalUrl: string, expirationDate: Date) => {
  try {
    const response = await axios.post(`${apiUrl}/create`, {
      original_url: originalUrl,
      expiration_date: expirationDate,
    })
    return response.data.code

  } catch (error) {
    console.error('Error creating shortened URL:', error)
    throw error
  }
}

export const getShortenedUrl = async (originalUrl: string, expirationDate: Date) => {
  try {
    const urlCode = await createShortenedUrl(originalUrl, expirationDate)
    const shortenedUrl = await axios.get(`${apiUrl}/${urlCode}`)

    return shortenedUrl
  } catch (error) {
    console.error('Error fetching shortened URL:', error)
    throw error
  }
}
