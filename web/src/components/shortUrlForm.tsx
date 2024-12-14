import { useState } from 'react'
import { Input } from './ui/input'
import { FormField } from './formfield'
import { DatePickerWithRange } from './ui/datepicker'
import { StatefulButton } from './statefulButton'
import { DateRange } from 'react-day-picker'

interface FormData {
  original_url: string
  expiration_time: Date
}

type ButtonState = 'static' | 'loading' | 'success' | 'error'

interface ShortUrlFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  buttonState: ButtonState
}

export const ShortUrlForm: React.FC<ShortUrlFormProps> = ({
  onSubmit,
  buttonState,
}) => {
  const [formData, setFormData] = useState<FormData>({
    original_url: '',
    expiration_time: new Date(),
  })

  const handleDateChange = (date: DateRange | undefined) => {
    if (date?.to) {
      setFormData({
        ...formData,
        expiration_time: date.to,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-between gap-4"
    >
      <div className="flex flex-col md:flex-row w-full gap-5">
        <FormField
          label="Your URL"
          inputComponent={
            <Input
              placeholder="https://example.com"
              value={formData.original_url}
              onChange={(e) =>
                setFormData({ ...formData, original_url: e.target.value })
              }
            />
          }
          containerClassName="w-full"
        />
        <FormField
          label="Expiration time"
          inputComponent={<DatePickerWithRange onChange={handleDateChange} />}
          containerClassName="w-fit"
        />
      </div>
      <StatefulButton onClick={() => onSubmit(formData)} state={buttonState} />
    </form>
  )
}
