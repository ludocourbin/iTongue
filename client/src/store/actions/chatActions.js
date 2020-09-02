export const SOCKET_CONNECT = "SOCKET_CONNECT";

export const socketConnect = () => ({
    type: SOCKET_CONNECT,
});

export const SOCKET_EMIT_MESSAGE = "SOCKET_EMIT_MESSAGE";

export const socketEmitMessage = (payload) => ({
    type: SOCKET_EMIT_MESSAGE,
    payload
});