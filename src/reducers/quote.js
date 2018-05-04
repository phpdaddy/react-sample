/**
 * Sample reducer
 */

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "LOAD":
            return {
                data: action.data
            }
        default:
            return state
    }
}

export const loadJson = data => ({type: "LOAD", data})

export default reducer