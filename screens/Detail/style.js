import styled from 'styled-components'
import MapView from 'react-native-maps'

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})`
  padding: 20px;
  padding-bottom: 0;
  background-color: #f8f8f8;
`

const Footer = styled.View`
  flex: 1;
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

const Picture = styled.Image`
  width: 100%;
  height: 150px;
  margin: 26px;
`

const Description = styled.Text`
  color: #101010;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 24px;
`

const Button = styled.TouchableOpacity`
  background-color: ${props => props.edit ? '#19647E' : '#a30b37'};
  width: 100px;
  border-radius: 8px;
  padding: 10px;
  margin: 20px;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  align-self: center;
`

const MapContainer = styled.View`
  height: 250px;
  width: 100%;
`

const Map = styled(MapView)`
  width: 100%;
  height: 250px;
`

const ErrorText = styled.Text`
    color: red;
    font-size: 14px;
    font-weight: 300;
`

export {
  Container,
  Title,
  Button,
  ButtonText,
  Description,
  Picture,
  Map,
  MapContainer,
  Footer,
  ErrorText
}
