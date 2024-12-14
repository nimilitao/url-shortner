import { Spinner } from './spinner'
import { Button } from './ui/button'

type ButtonState = 'static' | 'loading' | 'success' | 'error'

const buttonMessages: Record<ButtonState, React.ReactNode> = {
  static: 'Short URL',
  loading: (
    <div className="flex items-center gap-2">
      <Spinner />
      Shortening URL
    </div>
  ),
  success: 'Success!',
  error: 'Something went wrong',
}

const buttonClasses: Record<ButtonState, string> = {
  static: '',
  loading: 'cursor-not-allowed',
  success: 'bg-green-500 hover:bg-green-300 cursor-not-allowed',
  error: 'bg-red-500 hover:bg-red-400 cursor-not-allowed',
}

const buttonVariants: Record<ButtonState, 'default' | 'secondary'> = {
  static: 'default',
  loading: 'secondary',
  success: 'default',
  error: 'secondary',
}

interface StatefulButtonProps {
  state: ButtonState
  onClick: () => Promise<void>
}

export const StatefulButton: React.FC<StatefulButtonProps> = ({
  state,
  onClick,
}) => {
  return (
    <Button
      className={`w-full ${buttonClasses[state]}`}
      variant={buttonVariants[state]}
      onClick={onClick}
      disabled={state === 'loading' || state === 'success' || state === 'error'}
    >
      {buttonMessages[state]}
    </Button>
  )
}
