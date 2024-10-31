import { createStore } from "redux";
import produce from "immer";

const myState = {
  user: { name: "default", password: "default" },
  manager: { name: "רחלי", password: "1234" },
  recipyList: [],
};
const reducer = produce((state, action) => {
  switch (action.type) {
    case "setUser":
      {
        state.user.name = action.payload.name;
        state.user.password = action.payload.password;
      }
      break;
    case "addrecipesToList": {
      let recipe=action.payload.recipe
      state.recipes.push({
        recipe
      });
      
    }
    break;
    case "setMyRecipie": {
      state.recipyList = action.payload;
    }
  }
}, myState);

const store = createStore(reducer);

window.store = store;
export default store;
