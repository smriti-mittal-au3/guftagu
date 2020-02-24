module.exports = (state={search:"not searched", room:null, contacts:[]}, action) => {
    console.log("inside reducer: ", action.type, action.value)
    switch(action.type){
        case 'searched users':
                return Object.assign({}, state, {search: action.value})
        case "get-chat-content-for-selected-chat":
                return Object.assign({}, state, {room: action.value})
        case "contacts":
                return Object.assign({}, state, {contacts: action.value})
        default:
            return state

    }
}