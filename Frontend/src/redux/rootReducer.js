import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import propertyReducer from './property/propertyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
});

export default rootReducer;