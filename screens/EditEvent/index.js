import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import {
  Container,
  Title,
  EditButton,
  ButtonText,
  Input,
  Footer,
  Picture,
  ErrorText
} from './style'
import { getFromObjectPathParsed } from '../../utils'
import { apiService } from '../../services/api.service'

const Edit = (props) => {
  const { navigation, route } = props
  const { params: { item } } = route

  const [title, onChangeTitle] = useState(item.title || '')
  const [description, onChangeDescription] = useState(item.description || '')
  const [image, setImage] = useState(item.imageUrl || null)
  const [imageObjectInfo, setImageObjectInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getPermissionAsync()
  }, [])

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      console.error('Sorry, we need camera roll permissions to make this work!')
    }
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1
      })

      if (!result.cancelled) {
        setImage(result.uri)
        setImageObjectInfo({ ...result })
      }

      // console.log(result)
      // console.log(image)
    } catch (error) {
      console.log(error)
    }
  }

  const onPressEditButtonHandler = async () => {
    setLoading(true)
    try {
      const event = {
        id: item.id,
        title,
        description
      }

      // console.log('event', event)

      await apiService.updateEvent({ ...event })

      // console.log(result)

      if (imageObjectInfo) {
        await apiService.uploadImage({ id: event.id, imageObjectInfo })
        setImageObjectInfo(null)
      }

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
      <Title>Edit the event</Title>
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
      {image === null ? (
        <Button title='Select image' onPress={() => pickImage()} />
      ) : (
        <>
          <Picture source={{ uri: image }} />
          <Button title='Change image' onPress={() => pickImage()} />
        </>
      )}
      {!successful &&
        <ErrorText>{message}</ErrorText>}
      <Footer>
        <EditButton
          activeOpacity={0.8}
          onPress={onPressEditButtonHandler}
          disabled={loading}
        >
          <ButtonText>Edit</ButtonText>
        </EditButton>
      </Footer>
    </Container>
  )
}

export default Edit
