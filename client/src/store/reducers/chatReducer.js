import {
    SOCKET_SET_RECIPIENT,
    FETCH_ALL_THREADS,
    FETCH_ALL_THREADS_SUCCESS,
    FETCH_ALL_THREADS_ERROR,
    FETCH_ALL_MESSAGES,
    FETCH_ALL_MESSAGES_SUCCESS,
    FETCH_ALL_MESSAGES_ERROR,
    SET_MESSAGE_IN_ALL_MESSAGES,
    SET_USER_IS_TYPING,
} from "../actions/chatActions";

const initialState = {
    socketRecipient: {},
    allThreads: [],
    allMessages: {},
    userTyping: {},
};
export default (state = initialState, action = {}) => {
    switch (action.type) {

        case SOCKET_SET_RECIPIENT: 
            return {
                ...state,
                socketRecipient: action.payload,
            };
        case FETCH_ALL_THREADS: 
            return {
                ...state,
            };
        case FETCH_ALL_THREADS_SUCCESS: 
            return {
                ...state,
                allThreads: [...action.payload],
            };
        case FETCH_ALL_THREADS_ERROR: 
            return {
                ...state,
                allThreads: [],
            };
        case FETCH_ALL_MESSAGES: 
            return {
                ...state,
            };
        case FETCH_ALL_MESSAGES_SUCCESS: 
            return {
                ...state,
                allMessages: {...action.payload},
            };
        case FETCH_ALL_MESSAGES_ERROR: 
            return {
                ...state,
                allMessages: {},
            };
        case SET_MESSAGE_IN_ALL_MESSAGES: 
            return {
                ...state,
                allMessages: {
                    ...state.allMessages,
                    messages: [
                        ...state.allMessages.messages,
                        {...action.payload},
                    ],
                },
            };
        case SET_USER_IS_TYPING:
            return {
                ...state,
                userTyping: {...action.payload}
            }
        default:
            return state;
    };
};