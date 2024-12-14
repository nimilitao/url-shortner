import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import '../global.css'

export default function NotFoundPage() {
  return (
    <div className="mt-36  flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">
        Oops! The page you are looking for could not be found.
      </p>
      <Link to="/">
        <Button className="px-6 py-3">Go back to Home</Button>
      </Link>
    </div>
  )
}
