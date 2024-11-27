import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { DatePickerWithRange } from './components/ui/datepicker'

import './global.css'

export function App() {
  return (
    <div className="p-6 max-w-4xl mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-5">Short URL</h1>

      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="expiration" className="font-semibold">
              Expiration time
            </label>
            <div className="w-full">
              <Input placeholder="https://example.com" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="expiration" className="font-semibold">
              Expiration time
            </label>
            <div className="w-fit">
              <DatePickerWithRange />
            </div>
          </div>
        </div>

        <Button className="w-full bg-primary text-primary-foreground dark:bg-gray-100 dark:text-white">
          Short URL
        </Button>
      </div>
    </div>
  )
}
