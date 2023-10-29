// actions

const GET_ALL_MENU = 'menus/GET_ALL_MENU'
const ADD_MENU_ITEM = 'menus/ADD_MENU_ITEM'

//action creators

const actionGetAllMenu = (menu_items) => ({
    type: GET_ALL_MENU,
    menu_items
})

const actionAddMenuItem = (menu_item) => ({
    type: ADD_MENU_ITEM,
    menu_item
})

//thunk
export const getAllMenuItemThunk = () => async (dispatch) => {
    const res = await fetch("/api/menus", {
        // credentials: "include"
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetAllMenu(data))
        return data
    }
}

export const createMenuItemThunk = (data) => async (dispatch) => {
    const res = await fetch("/api/menus", {
        method: 'POST',
        body: data,
        // credentials: "include"
    })
    // console.log("-====================== this is res", res)
    if (res.ok) {
        const { resMenuItem } = await res.json()
        dispatch(actionAddMenuItem(resMenuItem))
        return resMenuItem
    } else {
        const error = await res.json()
        if (error.errors) {
            return error
        }
    }
}


//Reducer

const initialState = {}

const menuReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_MENU:
            newState = { ...action.menu_items }
            return newState
        case ADD_MENU_ITEM:
            newState = { ...state }
            newState[action.menu_item.id] = action.menu_item
            return newState
        default:
            return state
    }
}

export default menuReducer
