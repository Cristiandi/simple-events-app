import React, { useContext, useState, useEffect } from 'react'

import { AuthContext } from '../../AuthContext'
import ProductCard from '../../components/Card'
import { Button } from 'react-native'
import { Container, CreateButton, ButtonText, List } from './style'
import { apiService } from '../../services/api.service'
// import data from './data.json'

const Home = props => {
  const { navigation } = props
  const { signOut } = useContext(AuthContext)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => signOut()} title='Logout' />
      )
    })
  }, [navigation])

  //
  const [data, setData] = useState([])

  const fetchData = async () => {
    const result = await apiService.getAllEvents()

    // console.log(result)

    return result
  }

  useEffect(() => {
    let didCancel = false

    navigation.addListener('focus', () => {
      loadEvents()
    })

    const loadEvents = () => {
      fetchData().then(result => {
        if (!didCancel) {
          setData(result)
        }
      })
    }

    loadEvents()

    return () => {
      didCancel = true
    }
  }, [])

  //

  return (
    <Container>
      <List
        numColumns={2}
        data={data}
        renderItem={({ item }) => (
          <ProductCard item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
      <CreateButton activeOpacity={0.8} onPress={() => navigation.navigate('Create')}>
        <ButtonText>Create event</ButtonText>
      </CreateButton>
    </Container>
  )
}

export default Home
