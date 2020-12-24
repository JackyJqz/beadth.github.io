import { createStore } from 'redux';

import reducer from "./reducer";
import * as actionCreators from './actionCreators';
import * as constants from './constants';

export { reducer, actionCreators, constants };

export default createStore(reducer)