export const modalReducer = (state, action) => {
    switch (action.type) { 
        case 'OPEN_MODAL':
            return {
                ...state,
                open: true
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                open:false
            }
        default:
            return state;
    }
}