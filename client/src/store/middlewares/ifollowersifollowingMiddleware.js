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
            const { id } = store.getState().user.userSlugInfos;

            httpClient
                .get(
                    {
                        url: `/users/${id}/followers`,
                    },
                    store
                )
                .then((res) => {
                    console.log(res);

                    /* Currently no followers so I'll use an object to fake it */
                    store.dispatch(fetchIfollowersSuccess(res.data.data));

                    // store.dispatch(
                    //     fetchIfollowersSuccess([
                    //         {
                    //             id: "6",
                    //             firstname: "Sacha",
                    //             lastname: "Zacaropoulos",
                    //             slug: "sacha-zacaropoulos",
                    //         },
                    //     ])
                    // );
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
                        url: `/users/${store.getState().user.userSlugInfos.id}/followed`,
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
