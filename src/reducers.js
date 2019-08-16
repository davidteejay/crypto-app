import { combineReducers } from 'redux'
import {
  GET_DATA, SELECT_DATA, TOGGLE_MODAL, LOADING
} from './types'

const initialState = {
  items: [],
  selectedItem: null,
  modalVisible: false,
  loading: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        items: action.payload
      }
    case SELECT_DATA:
      return {
        ...state,
        selectedItem: action.payload
      }
    case TOGGLE_MODAL:
      return {
        ...state,
        modalVisible: action.payload
      }
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

export default combineReducers({
  app: reducer
})
