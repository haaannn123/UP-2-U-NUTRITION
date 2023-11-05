//actions

const GET_ALL_EVENTS = 'events/GET_ALL_EVENTS'
const ADD_EVENT = 'events/ADD_EVENT'
const EDIT_EVENT = 'events/EDIT_EVENT'
const DELETE_EVENT = 'events/DELETE_EVENT'

//action creators


export const actionGetAllEvents = (events) => ({
    type: GET_ALL_EVENTS,
    events
})

export const actionAddEvent = (event) => ({
    type: ADD_EVENT,
    event
})

export const actionEditEvent = (event) => ({
    type: EDIT_EVENT,
    event
})

export const actionDeleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId
})

//thunk
export const getAllEventsThunk = () => async (dispatch) => {
    const res = await fetch("/api/events/");
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAllEvents(data));
        return data;

    }
}

export const createEventThunk = (data) => async (dispatch) => {
    const res = await fetch("/api/events/", {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: data.title,
            details: data.details,
            start_date: data.startDate,
            end_date: data.endDate,
            start_time: data.startTime,
            end_time: data.endTime,
            color: data.color
        })
    })
    console.log(data)
    if (res.ok) {
        const { event } = await res.json()
        dispatch(actionAddEvent(event))
        return event
    } else {
        const error = await res.json()
        if (error.errors) {
            return error
        }
    }
}

export const editEventThunk = (data) => async (dispatch) => {
    console.log("The event id is", data.id)
    const res = await fetch(`/api/events/update/${data.id}`, {
        method: 'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: data.title,
            details: data.details,
            start_date: data.startDate,
            end_date: data.endDate,
            start_time: data.startTime,
            end_time: data.endTime,
            color: data.color
        })
    })
    console.log("inside fetch", data)
    if (res.ok) {
        const { event } = await res.json()
        dispatch(actionEditEvent(event))
        return event
    } else {
        console.log("error")
    }
}

export const deleteEventThunk = (event_id) => async (dispatch) => {
    const res = await fetch(`/api/events/${event_id}/delete`, {
        method: 'DELETE'
    })
    if (res.ok){
        dispatch(actionDeleteEvent)
    }
}


//Reducer
const initialState = {}

const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_EVENTS:{
            newState = { ...action.events }
            return newState
        }
        // case ADD_EVENT:{
        //     newState = {...state}
        //     newState
        //     return newState
        // }
        default:
            return state
    }
}


export default eventReducer
