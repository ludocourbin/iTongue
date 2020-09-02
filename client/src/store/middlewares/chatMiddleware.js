import io from 'socket.io-client';
import { updateTokenExp, updateAccessToken } from '../actions/userActions';
import { httpClient } from '../../utils';
import {
    SOCKET_CONNECT,
    SOCKET_EMIT_MESSAGE,
    SOCKET_EMIT_TYPING,
    FETCH_ALL_THREADS,
    fetchAllThreadsSuccess,
    fetchAllThreadsError,
    FETCH_ALL_MESSAGES,
    fetchAllMessagesSuccess,
    fetchAllMessagesError,
    setMessageInAllMessages,
    setUserIsTyping,
} from '../actions/chatActions';

let socket;

let typing = {};

export const chatMiddleware = (store) => (next) => (action) => {

    switch (action.type) {
        case SOCKET_CONNECT:
            getAccessToken(store).then(accessToken => {
                socket = io(process.env.REACT_APP_API_URL, {
                    forceNew: true,
                    query: {
                        token: accessToken,
                    }
                });

                socket.on("message", ({ authorId, authorAvatarUrl, text, recipientAvatarUrl}) => {
                    console.log("message reçu");
                    store.dispatch(setMessageInAllMessages({
                        id: Date.now(),
                        createdAt: new Date(),
                        text: text,
                        sender: {
                            id: authorId,
                            avatarUrl: authorAvatarUrl,
                        },
                        recipient: {
                            avatarUrl: recipientAvatarUrl
                        }
                    }));

                    store.dispatch(setUserIsTyping({}));
                });

                socket.on("typing", ({ authorId, authorName }) => {
                    console.log(authorName);
                    const contactId = store.getState().chatReducer.socketRecipient.id;
                    console.log({ contactId, authorId });
                    if (contactId && authorId == contactId) {
                        store.dispatch(setUserIsTyping({
                            authorId,
                            authorName,
                            typing: true,
                        }));

                        if (typing[contactId]) {
                            clearTimeout(typing[contactId]);
                        }
                        typing[contactId] = setTimeout(() => {
                            store.dispatch(setUserIsTyping({}));
                            delete typing[contactId];
                        }, 1800);
                    }
                });

                socket.on("disconnect", () => {
                    if (store.getState().user) {
                        store.dispatch({ type: SOCKET_CONNECT });
                    }
                });

                socket.on("error", err => {
                    console.log(err);
                });

                socket.on("serverError", err => {
                    console.log(err);
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
        case SOCKET_EMIT_TYPING:
            if (socket) {
                socket.emit("typing", action.payload);
            }
            break;
        case FETCH_ALL_THREADS:

            const { currentUser } = store.getState().user;
            httpClient.get({
                url: `/users/${currentUser.id}/threads`,
            }, store)
                .then(res => {
                    store.dispatch(fetchAllThreadsSuccess(res.data.data));
                    console.log("res", res);
                })
                .catch(err => {
                    console.error("err", err);
                    store.dispatch(fetchAllThreadsError());
                });
            break;
        case FETCH_ALL_MESSAGES:

            const currUser = store.getState().user.currentUser;
            const { socketRecipient } = store.getState().chatReducer;

            console.log("socketRecipient", socketRecipient);
            
            httpClient.get({
                url: `/users/${currUser.id}/threads/${socketRecipient.id}`,
            }, store)
                .then(res => {
                    store.dispatch(fetchAllMessagesSuccess(res.data.data));
                    console.log("res", res);
                })
                .catch(err => {
                    console.error("err", err);
                    store.dispatch(fetchAllMessagesError());
                });
            break;
        default:
            break;
    };
    next(action);
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