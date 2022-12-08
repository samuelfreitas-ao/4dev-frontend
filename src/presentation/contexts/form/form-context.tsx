import React from 'react'

type DataProps = {
  email: string
  password: string
}

type StateProps = {
  emailError: string
  passwordError: string
  isLoading: boolean
  errorMessage: string
}

type ContextProps = {
  data: DataProps
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: StateProps
  setState: (state: StateProps) => void
}

export const FormContext = React.createContext({} as ContextProps)

type FormContextLayerProps = {
  children: React.ReactElement
}

export const FormContextLayer = ({ children }: FormContextLayerProps): React.ReactElement => {
  const [data, setData] = React.useState<DataProps>({} as DataProps)
  const [state, setState] = React.useState<StateProps>({} as StateProps)

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
    setState({ ...state, errorMessage: message })
  }

  return (
    <FormContext.Provider value={{
      data,
      handleInputChange,
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
