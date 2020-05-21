import React, { useState, useContext } from 'react'

import {
  Container,
  Title,
  RegisterButton,
  RegisterTitle,
  LoginButton,
  LoginTitle,
  Input,
  ErrorText
} from './style'
import { AuthContext } from '../../AuthContext'
import { getFromObjectPathParsed } from '../../utils'

const Login = props => {
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [successful, onChageSuccessful] = useState(true)
  const [message, onChageMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { navigation } = props

  const { signIn } = useContext(AuthContext)

  const handleOnSubmit = async () => {
    setLoading(true)
    try {
      await signIn({ email, password })
    } catch (error) {
      onChageSuccessful(false)
      onChageMessage(getFromObjectPathParsed(error, 'response.data.error.message'))
    }
    setLoading(true)
  }

  return (
    <Container>
      <Title>Hi buddy!</Title>
      <Input
        onChangeText={text => onChangeEmail(text)}
        value={email}
        keyboardType='email-address'
        autoCompleteType='email'
        autoCapitalize='none'
        placeholder='Enter your email address'
        placeholderTextColor='#a6a6a6'
      />
      <Input
        onChangeText={text => onChangePassword(text)}
        value={password}
        placeholder='Enter your password'
        autoCompleteType='password'
        secureTextEntry
        placeholderTextColor='#a6a6a6'
      />
      {!successful &&
        <ErrorText>{message}</ErrorText>}
      <LoginButton
        activeOpacity={0.8}
        onPress={handleOnSubmit}
        disabled={loading}
      >
        <LoginTitle>Sign In</LoginTitle>
      </LoginButton>
      <RegisterButton
        onPress={() => navigation.navigate('Register')}
      >
        <RegisterTitle>Don't have an account?</RegisterTitle>
      </RegisterButton>
    </Container>
  )
}

export default Login
