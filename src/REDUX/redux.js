import { createStore, combineReducers } from 'redux';

const initialData = {
    items: []
};

export function addTheFood(info) {
    return {
        type: "ADD_FOOD",
        payload: info
    };
}

export function removeTheFood(foodId) {
    return {
        type: "REMOVE_FOOD",
        payload: foodId
    };
}

function foodReducer(state = initialData, action) {
   switch(action.type){
        case "ADD_FOOD":{

            const exisitingItem = state.items.find(items => items.foodId === action.payload.foodId)   
            if (exisitingItem) {
                return{
                    ...state,
                    items: state.items.map(item =>
                        item.foodId === action.payload.foodId ?{...item, quantity: item.quantity+1}: item
                    )

                }
            }else{
                return{
                    ...state,
                    items:[...state.items, {...action.payload, quantity: 1}]
                }
            }
        }


        case "REMOVE_FOOD":{
            const exisitingItem = state.items.find(item => item.foodId === action.payload)
            if(exisitingItem && exisitingItem.quantity > 1){
                return{
                    ...state,
                    items: state.items.map(item => 
                        item.foodId === action.payload ? {...item, quantity: item.quantity - 1} : item)

                }
            }else{
                return{
                    ...state,
                    items: state.items.filter(item => item.foodId !== action.payload)
                }
            }
        }
        default:
           return state
    }
  }     

const rootReducer = combineReducers({
    food: foodReducer
});

export const store = createStore(rootReducer);
