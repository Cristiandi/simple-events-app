import React, { useState, useEffect } from 'react'
import * as Permissions from 'expo-permissions'
import {
  Container,
  Title,
  CreateButton,
  ButtonText,
  Input,
  Footer,
  CardContainer,
  CardContainerText,
  ErrorText
} from './style'

import { apiService } from '../../services/api.service'
import { getFromObjectPathParsed } from '../../utils'

const Create = (props) => {
  const [title, onChangeTitle] = useState('')
  const [description, onChangeDescription] = useState('')
  const [location, setLocation] = useState('')
  const [places, setPlaces] = useState([])
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [successful, setSuccessful] = useState(true)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { navigation } = props

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      console.error(
        'Sorry, we need camera roll permissions to make this work!'
      )
    }
  }

  useEffect(() => {
    getPermissionAsync()
  }, [])

  const onChangeLocationHandler = async (text) => {
    setLocation(text)

    if (text.length >= 5) {
      try {
        const result = await apiService.getPlacePredictions({ input: text })
        setPlaces(result.slice(0, 3))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onPressLocationItemHandler = async (item) => {
    onChangeLocationHandler(item.description)

    try {
      const result = await apiService.getGeoPoint({ place: item.description })

      const { location: { lat: latitude, lng: longitude } } = result

      setLat(latitude)
      setLong(longitude)
    } catch (error) {
      console.log('error', error)
    }
  }

  const onPressCreateButtonHandler = async () => {
    setLoading(true)
    try {
      const event = {
        title,
        description,
        lat,
        long
      }

      // console.log('event', event)

      await apiService.createEvent({ ...event })

      // console.log(result)

      navigation.navigate('Home')
    } catch (error) {
      console.log('error', error)
      setSuccessful(false)
      setMessage(getFromObjectPathParsed(error, 'response.data.error.message'))
    }

    setLoading(false)
  }

  return (
    <Container>
      <Title>Create the event</Title>
      <Input
        onChangeText={(text) => onChangeTitle(text)}
        value={title}
        placeholder='Enter a title'
        placeholderTextColor='#a6a6a6'
      />
      <Input
        onChangeText={(text) => onChangeDescription(text)}
        value={description}
        placeholder='Enter a description'
        placeholderTextColor='#a6a6a6'
      />
      <Input
        onChangeText={onChangeLocationHandler}
        value={location}
        autoCapitalize='none'
        placeholder='Enter a location'
        placeholderTextColor='#a6a6a6'
      />
      {places.map((item, i) => (
        <CardContainer
          key={i}
          activeOpacity={0.8}
          onPress={() => {
            onPressLocationItemHandler(item)
          }}
        >
          <CardContainerText>{item.description}</CardContainerText>
        </CardContainer>
      ))}
      {!successful &&
        <ErrorText>{message}</ErrorText>}
      <Footer>
        <CreateButton
          activeOpacity={0.8}
          onPress={onPressCreateButtonHandler}
          disabled={loading}
        >
          <ButtonText>Create</ButtonText>
        </CreateButton>
      </Footer>
    </Container>
  )
}

export default Create
