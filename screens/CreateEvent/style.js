import styled from 'styled-components'

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})`
  padding: 20px;
  background-color: #f8f8f8;
`

const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const CreateButton = styled.TouchableOpacity`
    background-color: #429EA6;
    justify-content: flex-end;
    border-radius: 8px;
    width: 80%;
    padding: 10px;
    margin: 20px;
`

const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    align-self: center;
`

const LoginTitle = styled.Text`
    color: #429EA6;
    font-size: 14px;
    font-weight: 300;
`

const LoginButton = styled.TouchableOpacity`
    border-radius: 5px;
    padding: 10px;
    margin: 0 20px 20px;
`

const Picture = styled.Image`
  width: 100%;
  height: 200px;
  margin: 26px;
`

const List = styled.FlatList.attrs({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
})`
    padding: 0px 20px;
    width: 100%;
  `
const CardContainer = styled.TouchableOpacity`
width: 100%;
margin-top: 10px;
justify-content: flex-start;
align-items: center;
border-radius: 8px;
background-color: white;
overflow: hidden;
`

const CardContainerText = styled.Text`
    color: black;
    font-size: 18px;
    font-weight: bold;
    align-self: center;
`
const ErrorText = styled.Text`
    color: red;
    font-size: 14px;
    font-weight: 300;
`

export {
  Container,
  Title,
  CreateButton,
  ButtonText,
  Input,
  LoginTitle,
  LoginButton,
  Footer,
  Picture,
  List,
  CardContainer,
  CardContainerText,
  ErrorText
}
