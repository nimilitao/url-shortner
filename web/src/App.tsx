import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { DatePickerWithRange } from './components/ui/datepicker'
import { Toaster } from './components/ui/sonner'
import { toast } from 'sonner'
import { FormField } from './components/formfield'
import { ThemeProvider } from './components/themeprovider'

import './global.css'

export function App() {
  const handleShortenUrl = () => {
    const shortenedUrl = 'https://exemplo.com/abc123'

    const toastId = toast.success('URL successfully shortened!', {
      duration: Infinity,
      className: 'border-2 border-green-500 rounded-lg p-4',
      description: `Your shortened URL: ${shortenedUrl}`,
      action: {
        label: 'Copy',

        onClick: () => {
          navigator.clipboard.writeText(shortenedUrl).then(() => {
            toast.dismiss(toastId)
            toast.success('URL copied to clipboard!')
          })
        },
      },
    })
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="p-6 max-w-3xl mx-auto mt-16">
        <h1 className="text-3xl font-bold mb-5">Short URL</h1>
        <div className="flex flex-col items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row w-full gap-5">
            <FormField
              label="Your URL"
              inputComponent={<Input placeholder="https://example.com" />}
              containerClassName="w-full"
            />

            <FormField
              label="Expiration time"
              inputComponent={<DatePickerWithRange />}
              containerClassName="w-fit"
            />
          </div>

          <Button className="w-full" onClick={handleShortenUrl}>
            Short URL
          </Button>
        </div>
        <Toaster position="bottom-right" />
      </main>
    </ThemeProvider>
  )
}
