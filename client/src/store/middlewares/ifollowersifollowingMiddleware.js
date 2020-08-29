import { httpClient } from "../../utils";

import {
    FETCH_IFOLLOWERS,
    fetchIfollowersSuccess,
    fetchIfollowersError,
    FETCH_IFOLLOWING,
    fetchIfollowingSuccess,
    fetchIfollowingError,
} from "../actions/ifollowersifollowingActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_IFOLLOWERS:
            const { currentUser } = store.getState().user;

            httpClient
                .get(
                    {
                        url: `/users/${currentUser.id}/followers`,
                    },
                    store
                )
                .then((res) => {
                    console.log(res);

                    /* Currently no followers so I'll use an object to fake it */
                    //  store.dispatch(fetchIfollowersSuccess(res.data.data))

                    store.dispatch(
                        fetchIfollowersSuccess([
                            {
                                id: "5",
                                firstname: "Gautier",
                                lastname: "Colasse",
                                slug: "gautier-colasse",
                                avatarUrl:
                                    "uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc",
                            },
                        ])
                    );
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(fetchIfollowersError());
                });
            return;
        case FETCH_IFOLLOWING:
            httpClient
                .get(
                    {
                        url: `/users/${store.getState().user.currentUser.id}/followed`,
                    },
                    store
                )
                .then((res) => {
                    store.dispatch(fetchIfollowingSuccess(res.data.data));
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(fetchIfollowingError());
                });
            return;
        default:
            return;
    }
};