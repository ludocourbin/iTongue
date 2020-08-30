import { httpClient } from "../../utils";

import {
    FOLLOW,
    followSuccess,
    followError,
    UNFOLLOW,
    unFollowSuccess,
    unFollowError,
} from "../actions/followActions";

export const followMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FOLLOW:

            const currentUserId = store.getState().user.currentUser.id;

            httpClient
                .post({
                    url: `/users/${action.payload}/follow`,
                    data: {
                        followedId: currentUserId
                    }
                }, store)
                .then((res) => {
                    console.log(res);
                    store.dispatch(followSuccess());
                })
                .catch((err) => {
                    console.error(err);
                    //console.log(err.response.data);
                    store.dispatch(followError());
                });
            break;
            /*
        case UNFOLLOW:
            httpClient
                .delete({
                    url: `/users/${userId}/follow/${followerId}`,
                })
                .then((res) => {
                    console.log(res.data.data);
                    store.dispatch(unFollowSuccess(res.data.data));
                })
                .catch((err) => {
                    console.error(err);
                    console.log(err.response.data);
                    store.dispatch(unFollowError(err));
                });
            break;
            */
        default:
            break;
    }
};
