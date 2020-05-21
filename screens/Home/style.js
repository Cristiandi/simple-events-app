import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
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

const Title = styled.Text`
  color: #101010;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`

const CreateButton = styled.TouchableOpacity`
  background-color: #7CAE7A;
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

export { Container, Title, CreateButton, ButtonText, List }
