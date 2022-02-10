import { GET_COLLECTION } from '../../redux/types';

const initialState = {
    collection:[],
    getAuth: true
    
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COLLECTION:
            return {
                ...state,
                collection: action.payload.collection,
                getAuth: true
            }
        
        default:
            return {
                ...state
            }
    }
}