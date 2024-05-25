import { ADD_PROPERTY,GET_ALL_PROPERTIES,GET_SINGLE_PROPERTY,GET_SELLER } from './actiontypes';

const initialState = {
  properties: [],
  singleProperty:{},
  seller:{}
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROPERTY:
      return {
        ...state,
        properties: [...state.properties, action.payload],
      };
    case GET_ALL_PROPERTIES:
      return {
        ...state,
        properties: action.payload,
      };
    case GET_SINGLE_PROPERTY:
      return {
        ...state,
        singleProperty: action.payload,
      };
    case GET_SELLER:
      return {
        ...state,
        seller: action.payload,
      };
    default:
      return state;
  }
};

export default propertyReducer;
