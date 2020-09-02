export const SOCKET_CONNECT = "SOCKET_CONNECT";
export const SOCKET_EMIT_MESSAGE = "SOCKET_EMIT_MESSAGE";
export const SOCKET_EMIT_TYPING = "SOCKET_EMIT_TYPING";
export const SOCKET_SET_RECIPIENT_ID = "SOCKET_SET_RECIPIENT_ID";

export const socketConnect = () => ({
    type: SOCKET_CONNECT,
});

export const socketEmitMessage = (payload) => ({
    type: SOCKET_EMIT_MESSAGE,
    payload,
});

export const socketEmitTyping = (payload) => ({
    type: SOCKET_EMIT_TYPING,
    payload,
});

export const socketSetRecipientId = (payload) => ({
    type: SOCKET_SET_RECIPIENT_ID,
    payload,
});

export const FETCH_ALL_THREADS = "FETCH_ALL_THREADS";
export const FETCH_ALL_THREADS_SUCCESS = "FETCH_ALL_THREADS_SUCCESS";
export const FETCH_ALL_THREADS_ERROR = "FETCH_ALL_THREADS_ERROR";

export const fetchAllThreads = () => ({
    type: FETCH_ALL_THREADS,
});

export const fetchAllThreadsSuccess = (payload) => ({
    type: FETCH_ALL_THREADS_SUCCESS,
    payload,
});

export const fetchAllThreadsError = (payload) => ({
    type: FETCH_ALL_THREADS_ERROR,
    payload,
});

export const FETCH_ALL_MESSAGES = "FETCH_ALL_MESSAGES";
export const FETCH_ALL_MESSAGES_SUCCESS = "FETCH_ALL_MESSAGES_SUCCESS";
export const FETCH_ALL_MESSAGES_ERROR = "FETCH_ALL_MESSAGES_ERROR";

export const fetchAllMessages = () => ({
    type: FETCH_ALL_MESSAGES,
});

export const fetchAllMessagesSuccess = (payload) => ({
    type: FETCH_ALL_MESSAGES_SUCCESS,
    payload,
});

export const fetchAllMessagesError = (payload) => ({
    type: FETCH_ALL_MESSAGES_ERROR,
    payload,
});

export const SET_MESSAGE_IN_ALL_MESSAGES = "SET_MESSAGE_IN_ALL_MESSAGES";

export const setMessageInAllMessages = (payload) => ({
    type: SET_MESSAGE_IN_ALL_MESSAGES,
    payload,
});