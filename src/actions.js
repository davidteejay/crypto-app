import axios from 'axios'
import { Alert, BackHandler } from 'react-native'
import { GET_DATA, SELECT_DATA, TOGGLE_MODAL, LOADING } from './types'

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=30'

export const fetchAllData = () => (
  dispatch => {
    dispatch({
      type: LOADING,
      payload: true
    })

    axios
      .get(url, {
        headers: {
          'X-CMC_PRO_API_KEY': '7348b419-66bb-4cdb-85cd-e50747198b46'
        }
      })
      .then(res => {
        const { data } = res

        dispatch({
          type: GET_DATA,
          payload: data.data
        })
      })
      .catch(err => {
        console.log(err)
        Alert.alert(
          'Oops!!',
          'Something went wrong. Please try again',
          [
            {
              text: 'Try Again',
              onPress: fetchAllData
            }, {
              text: 'Exit',
              onPress: BackHandler.exitApp,
              style: 'destructive'
            }
          ],
          {
            onDismiss: BackHandler.exitApp
          }
        )
      })
      .finally(() => dispatch({
        type: LOADING,
        payload: false
      }))
  }
)

export const selectData = payload => (
  dispatch => {
    dispatch({
      type: SELECT_DATA,
      payload
    })

    dispatch({
      type: TOGGLE_MODAL,
      payload: true
    })
  }
)

export const closeModal = () => (
  dispatch => {
    dispatch({type: TOGGLE_MODAL,
      payload: false
    })

    dispatch({
      type: SELECT_DATA,
      payload: null
    })
  }
)
