import styled from 'styled-components'

const Container = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: #f8f8f8;
    padding: 0 20px;
`

const Title = styled.Text`
    color: #101010;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
`

const Input = styled.TextInput`
    background-color: #e6e6e6;
    border-radius: 8px;
    width: 80%;
    margin-bottom: 4px;
    padding: 12px;
`

const RegisterButton = styled.TouchableOpacity`
    border-radius: 5px;
    padding: 10px;
    margin: 0 20px 20px;
`

const LoginButton = styled.TouchableOpacity`
    background-color: #429EA6;
    justify-content: flex-end;
    border-radius: 8px;
    width: 80%;
    padding: 10px;
    margin: 20px;
`

const LoginTitle = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    align-self: center;
`

const RegisterTitle = styled.Text`
    color: #429EA6;
    font-size: 14px;
    font-weight: 300;
`

const ErrorText = styled.Text`
    color: red;
    font-size: 14px;
    font-weight: 300;
`

export {
  Container,
  Title,
  RegisterButton,
  LoginButton,
  RegisterTitle,
  LoginTitle,
  Input,
  ErrorText
}
