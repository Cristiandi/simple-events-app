import React, { useReducer, useEffect, useMemo } from 'react'
import { AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './screens/Login'
import Register from './screens/Register'
import Home from './screens/Home'
import Detail from './screens/Detail'
import Splash from './screens/Splash'
import Edit from './screens/EditEvent'
import Create from './screens/CreateEvent'

import { AuthContext } from './AuthContext'
import { apiService } from './services/api.service'

const Stack = createStackNavigator()

export default function App ({ navigation }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_AUTH':
          return {
            ...prevState,
            userToken: action.userToken,
            loggedUserIn: action.loggedUserIn,
            isLoading: false
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.userToken,
            loggedUserIn: action.loggedUserIn
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            loggedUserIn: null
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      loggedUserIn: null
    }
  )

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken
      let loggedUserIn
      try {
        userToken = await AsyncStorage.getItem('userToken')
        loggedUserIn = await AsyncStorage.getItem('loggedUserIn')
        loggedUserIn = JSON.parse(loggedUserIn)
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_AUTH', userToken, loggedUserIn })
    }
    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({
      signUp: async ({ username, email, password }) => {
        console.log('username', username, 'email', email, 'password', password)

        const result = await apiService.register({
          username,
          email,
          password
        })

        console.log('result - signUp', result)

        dispatch({ type: 'SIGN_OUT' })
      },
      signIn: async ({ email, password }) => {
        const result = await apiService.login({
          email,
          password
        })

        const { accessToken: userToken } = result

        await AsyncStorage.setItem('userToken', userToken)

        const loggedUserIn = { ...result }
        delete loggedUserIn.accessToken

        await AsyncStorage.setItem('loggedUserIn', JSON.stringify(loggedUserIn))

        dispatch({
          type: 'SIGN_IN',
          userToken,
          loggedUserIn
        })
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken')
          await AsyncStorage.removeItem('loggedUserIn')
        } catch (e) {
          console.log('error')
          // Restoring token failed
        }
        dispatch({ type: 'SIGN_OUT' })
      }
    }),
    []
  )

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name='Splash' component={Splash} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen
                name='Login'
                component={Login}
                options={{
                  title: 'Login Screen',
                  headerShown: false,
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push'
                }}
              />
              <Stack.Screen
                name='Register'
                component={Register}
                options={{ title: 'Back to login', headerTransparent: true }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name='Home'
                component={Home}
                options={{ title: 'Home Screen' }}
              />
              <Stack.Screen
                name='Detail'
                component={Detail}
                options={{ title: 'Back to events' }}
              />
              <Stack.Screen
                name='Edit'
                component={Edit}
                options={{ title: 'Back to events' }}
              />
              <Stack.Screen
                name='Create'
                component={Create}
                options={{ title: 'Back to events' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
