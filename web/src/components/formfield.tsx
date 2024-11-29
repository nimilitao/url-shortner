interface FormFieldProps {
  label: string
  inputComponent: React.ReactNode
  containerClassName?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  inputComponent,
  containerClassName,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <label className="font-semibold">{label}</label>
      <div className="w-full">{inputComponent}</div>
    </div>
  )
}
