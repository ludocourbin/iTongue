import io from 'socket.io-client';
import { updateTokenExp, updateAccessToken } from '../actions/userActions';
import { httpClient } from '../../utils';
import { SOCKET_CONNECT, SOCKET_EMIT_MESSAGE } from '../actions/chatActions'

let socket;

export const chatMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case SOCKET_CONNECT:
            const user = store.getState().user;
            const { refreshToken, accessTokenExp } = user;
            let { accessToken } = user;

            if (refreshToken && (!accessToken || accessTokenExp < Date.now())) {
                console.log("token refreshing chat");

                httpClient.post({
                    url: "/auth/refresh",
                    data: { refreshToken: refreshToken },
                }).then(response => {
                    accessToken = response.data.data.accessToken;
                    store.dispatch(updateTokenExp());
                    store.dispatch(updateAccessToken(accessToken));

                    socket = io(process.env.REACT_APP_API_URL, {
                        query: {
                            token: accessToken,
                        }
                    });
                    socket.on("message", data => {
                        console.log(data);
                    });

                    socket.on("typing", data => {
                        console.log(data);
                    });

                    socket.on("disconnect", () => {
                        // déclencher l'action dans laquell on se trouve
                        store.dispatch({ type: SOCKET_CONNECT });
                    });

                    console.log("socket", socket);
                });
            } else {
                socket = io(process.env.REACT_APP_API_URL, {
                    query: {
                        token: accessToken,
                    }
                });
                socket.on("message", data => {
                    console.log(data);
                });

                socket.on("typing", data => {
                    console.log(data);
                });

                socket.on("disconnect", () => {
                    // déclencher l'action dans laquell on se trouve
                    store.dispatch({ type: SOCKET_CONNECT });
                });

                socket.on("error", err => {
                    console.log(err)
                });

                console.log("socket", socket);
            }

            break;
        case SOCKET_EMIT_MESSAGE:
            if (socket) {
                // {text: "ça va mon poulet ?", recipient_id: 1}
                socket.emit("message", action.payload);
            }
            break;
        default:
            break;
    };
};