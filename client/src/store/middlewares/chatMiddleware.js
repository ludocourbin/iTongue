import io from 'socket.io-client';
import { updateTokenExp, updateAccessToken } from '../actions/userActions';
import { httpClient } from '../../utils';
import { SOCKET_CONNECT, SOCKET_EMIT_MESSAGE } from '../actions/chatActions'

let socket;

export const chatMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case SOCKET_CONNECT:
            getAccessToken(store).then(accessToken => {
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
                    store.dispatch({ type: SOCKET_CONNECT });
                });

                socket.on("error", err => {
                    console.log(err)
                });
            }).catch(err => { 
                console.log(err);
            })
            break;
        case SOCKET_EMIT_MESSAGE:
            if (socket) {
                socket.emit("message", action.payload);
            }
            break;
        default:
            break;
    };
};

function getAccessToken(store) {
    return new Promise((resolve, reject) => {
        const user = store.getState().user;
        const { refreshToken, accessTokenExp } = user;
        let { accessToken } = user;

        if (accessToken && accessTokenExp >= Date.now()) return resolve(accessToken);

        if (!refreshToken) return reject(new Error("Le token ne peut être renouvelé en l'absence de refreshToken"));

        httpClient.post({
            url: "/auth/refresh",
            data: { refreshToken: refreshToken },
        }).then(response => {
            accessToken = response.data.data.accessToken;
            store.dispatch(updateTokenExp());
            store.dispatch(updateAccessToken(accessToken));

            resolve(accessToken);
        }).catch(err => {
            reject(err);
        });
    })
}