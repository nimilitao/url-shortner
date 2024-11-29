import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { DatePickerWithRange } from './components/ui/datepicker'
import { FormField } from './components/formfield'

import './global.css'

export function App() {
  return (
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

        <Button className="w-full">
          Short URL
        </Button>
      </div>
    </main>
  )
}
