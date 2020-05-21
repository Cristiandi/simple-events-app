import styled from 'styled-components'

const CardContainer = styled.TouchableOpacity`
    width: 45%;
    margin-top: 10px;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 2.5%;
    border-radius: 8px;
    background-color: white;
    overflow: hidden;
`

const Picture = styled.Image`
width: 100%;
height: 100px;
`

const Title = styled.Text`
    color: #696969;
    padding: 12px;
    align-self: flex-start;
    font-size: 16px;
    font-weight: 300;
`

export {
  CardContainer,
  Picture,
  Title
}
