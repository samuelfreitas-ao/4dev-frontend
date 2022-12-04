import React from 'react'

type DataProps = {
  email: string
  password: string
}

type StateProps = {
  emailError: string
  passwordError: string
}

type ContextProps = {
  data: DataProps
  setIsLoading: (isLoading: boolean) => void
  isLoading: boolean
  errorMessage: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  state: StateProps
  setState: (state: StateProps) => void
}

export const FormContext = React.createContext({} as ContextProps)

type FormContextLayerProps = {
  children: React.ReactElement
}

export const FormContextLayer = ({ children }: FormContextLayerProps): React.ReactElement => {
  const [data, setData] = React.useState<DataProps>({} as DataProps)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [state, setState] = React.useState<StateProps>({
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    const message = ''
    setData({ ...data, [name]: value })
    // if (!value.trim()) {
    //   message = `Preencha o campo ${name}`
    //   setState({ ...state, [`${name}Error`]: message })
    // } else {
    //   setState({ ...state, [`${name}Error`]: '' })
    // }
    setErrorMessage(message)
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setIsLoading(true)
  }

  return (
    <FormContext.Provider value={{
      data,
      isLoading,
      setIsLoading,
      handleInputChange,
      handleSubmit,
      errorMessage,
      setState,
      state
    }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = (): ContextProps => {
  return React.useContext(FormContext)
}
