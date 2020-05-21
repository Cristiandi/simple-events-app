import { AsyncStorage } from 'react-native'

/**
 * function to get something from the object path when the object is parsed.
 *
 * @param {object} [object={}]
 * @param {string} [path='']
 * @returns {any}
 */
export const getFromObjectPathParsed = (object = {}, path = '') => {
  const keysToEvaluete = path.split('.')

  let iteraingObject = object
  for (const key of keysToEvaluete) {
    iteraingObject = iteraingObject[key]
    if (!iteraingObject) return
  }
  return iteraingObject
}

export const getLoggedUserIn = async () => {
  let loggedUserIn = await AsyncStorage.getItem('loggedUserIn')
  loggedUserIn = JSON.parse(loggedUserIn)

  return loggedUserIn
}

export const getUserToken = async () => {
  const userToken = await AsyncStorage.getItem('userToken')

  return userToken
}
