import React, { useState, useEffect } from 'react'
import { Marker } from 'react-native-maps'

import { getLoggedUserIn, getFromObjectPathParsed } from '../../utils'

import {
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
} from './style'

import { apiService } from '../../services/api.service'

const Detail = (props) => {
  const { navigation } = props
  const { item } = props.route.params

  const [loggedUserIn, setLoggedUserIn] = useState({})
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let didCancel = false

    getLoggedUserIn().then(result => {
      if (!didCancel) {
        setLoggedUserIn(result)
      }
    })

    return () => {
      didCancel = true
    }
  }, [])

  const onPressRemoveHandler = async () => {
    setLoading(true)
    try {
      await apiService.deleteEvent({
        id: item.id
      })
      navigation.navigate('Home')
    } catch (error) {
      console.error(error)
      setSuccessful(false)
      setMessage(getFromObjectPathParsed(error, 'response.data.error.message'))
    }
    setLoading(true)
  }

  return (
    <Container>
      <Title>{item.title}</Title>
      <Description>{item.description}</Description>
      <Picture source={{ uri: item.imageUrl }} />
      <MapContainer>
        <Map
          initialRegion={{
            latitude: Number(item.lat),
            longitude: Number(item.long),
            latitudeDelta: 0.2,
            longitudeDelta: 0.2
          }}
        >
          <Marker
            key={item.id}
            coordinate={{ latitude: Number(item.lat), longitude: Number(item.long) }}
            title={item.title}
            description={item.description}
          />
        </Map>
      </MapContainer>
      {loggedUserIn.id === item.userId &&
        <Footer>
          {!successful &&
            <ErrorText>{message}</ErrorText>}
          <Button edit activeOpacity={0.8} onPress={() => navigation.navigate('Edit', { item })}>
            <ButtonText>Edit</ButtonText>
          </Button>
          <Button
            activeOpacity={0.8}
            onPress={onPressRemoveHandler}
            disabled={loading}
          >
            <ButtonText>Remove</ButtonText>
          </Button>
        </Footer>}
    </Container>
  )
}

export default Detail
