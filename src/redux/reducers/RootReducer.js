import {combineReducers} from "redux";
import {userReducer} from "./UserReducer";
import {categoryReducer} from "./CategoryReducer";
import { articleReducer } from "./ArticleReducer";
// import {articleReducer} from "./ArticleReducer"; //A implementer //TODO:

export const rootReducer = combineReducers({
    userReducer, categoryReducer, articleReducer
    // ,recipeReducer //Aimplementer
});