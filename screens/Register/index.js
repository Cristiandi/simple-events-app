import React, { useState, useContext } from 'react'

import { AuthContext } from '../../AuthContext'
import { Container, Title, RegisterButton, LoginText, LoginButton, RegisterTitle, Input, ErrorText } from './style'
import { getFromObjectPathParsed } from '../../utils'

const Register = props => {
  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [username, onChangeUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState(true)
  const [message, setMessage] = useState('')

  const { navigation } = props

  const { signUp } = useContext(AuthContext)
  const { signIn } = useContext(AuthContext)

  const handleOnSubmit = async () => {
    setLoading(true)
    try {
      await signUp({ username, email, password })
      await signIn({ email, password })
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
      setSuccessful(false)
      setMessage(getFromObjectPathParsed(error, 'response.data.error.message'))
    }
    setLoading(false)
  }

  return (
    <Container>
      <Title>Create account!</Title>
      <Input
        onChangeText={text => onChangeUsername(text)}
        value={username}
        autoCompleteType='username'
        placeholder='Enter an username'
        placeholderTextColor='#a6a6a6'
      />
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
      <RegisterButton
        activeOpacity={0.8}
        onPress={handleOnSubmit}
      >
        <RegisterTitle>Register</RegisterTitle>
      </RegisterButton>
      <LoginButton
        onPress={() => navigation.navigate('Login')}
        disabled={loading}
      >
        <LoginText>Already have an account? Sign in.</LoginText>
      </LoginButton>
    </Container>
  )
}

export default Register
