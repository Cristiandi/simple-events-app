import axios from 'axios'

import { API_BASE_URL } from '../environment'

import { getUserToken } from '../utils'

class ApiService {
  constructor () {
    this.baseUrl = API_BASE_URL
  }

  async login ({ email, password }) {
    const result = await axios({
      method: 'post',
      url: `${this.baseUrl}users/login`,
      data: {
        email,
        password
      }
    })

    const { data } = result

    return data
  }

  async register ({ username, email, password }) {
    const result = await axios({
      method: 'post',
      url: `${this.baseUrl}users`,
      data: {
        username,
        email,
        password
      }
    })

    const { data } = result

    return data
  }

  async getAllEvents () {
    const userToken = await getUserToken()

    const result = await axios({
      method: 'get',
      url: `${this.baseUrl}events`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      params: {
        limit: 100,
        skip: 0
      }
    })

    const { data } = result

    return data
  }

  async getPlacePredictions ({ input }) {
    const userToken = await getUserToken()

    const result = await axios({
      method: 'get',
      url: `${this.baseUrl}events/place-predictions`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      params: {
        input
      }
    })

    const { data } = result

    return data
  }

  async getGeoPoint ({ place }) {
    const userToken = await getUserToken()

    const result = await axios({
      method: 'get',
      url: `${this.baseUrl}events/geo-point`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      params: {
        place
      }
    })

    const { data } = result

    return data
  }

  async createEvent ({ title, description, lat, long }) {
    const userToken = await getUserToken()

    const result = await axios({
      method: 'post',
      url: `${this.baseUrl}events`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        title,
        description: description || undefined,
        lat: lat ? String(lat) : undefined,
        long: long ? String(long) : undefined
      }
    })

    const { data } = result

    return data
  }

  async updateEvent ({ id, title, description }) {
    const userToken = await getUserToken()

    const result = await axios({
      method: 'patch',
      url: `${this.baseUrl}events/${id}`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        title,
        description: description || undefined
      }
    })

    const { data } = result

    return data
  }

  async deleteEvent ({ id }) {
    const userToken = await getUserToken()

    const result = await axios({
      method: 'delete',
      url: `${this.baseUrl}events/${id}`,
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })

    const { data } = result

    // console.log('delete result', data)

    return data
  }

  async uploadImage ({ id, imageObjectInfo }) {
    const userToken = await getUserToken()

    const formdata = new FormData()

    const getFileName = imageObjectInfo => {
      const array = imageObjectInfo.uri.split('/')

      const fileName = array[array.length ? array.length - 1 : array.length]

      console.log('file name', fileName)

      return fileName
    }

    formdata.append('file', {
      uri: imageObjectInfo.uri,
      type: 'image/jpeg',
      name: getFileName(imageObjectInfo)
    })

    // console.log('formdata', formdata)

    const result = await axios({
      method: 'patch',
      url: `${this.baseUrl}events/image/${id}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data'
      },
      data: formdata
    })

    const { data } = result

    // console.log('result', data)

    return data
  }
}

export const apiService = new ApiService()
