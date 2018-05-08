import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './toggleform'
import itemEditing from './itemEditing'
const myReducer = combineReducers({
    tasks, // tasks : tasks
    isDisplayForm, // isDisplayForm : isDisplayForm
    itemEditing
});

export default myReducer;