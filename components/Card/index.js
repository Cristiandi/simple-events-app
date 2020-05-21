import React from 'react'
import { CardContainer, Picture, Title } from './style'

const ProductCard = ({ item, navigation }) => {
  return (
    <CardContainer activeOpacity={0.8} onPress={() => { navigation.navigate('Detail', item = { item }) }}>
      <Picture source={{ uri: item.imageUrl }} />
      <Title>{item.title}</Title>
    </CardContainer>
  )
}

export default ProductCard
