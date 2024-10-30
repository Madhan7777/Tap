import { combineReducers } from "redux";
import { TitleReducer } from "./TitleReducer";
import { EmailReducer } from "./EmailReducer";

/*
This is an example for reducer
where you can include you data as a key and value 
*/

const OverallReducer = combineReducers({
  title: TitleReducer,
  email: EmailReducer, 
});

export default OverallReducer;
