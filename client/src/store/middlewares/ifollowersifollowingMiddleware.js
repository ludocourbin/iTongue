import { httpClient } from "../../utils";

import {
    FETCH_IFOLLOWERS,
    fetchIfollowersSuccess,
    fetchIfollowersError,
    FETCH_IFOLLOWING,
    fetchIfollowingSuccess,
    fetchIfollowingError,
    FOLLOW_IFOLLOWERS_PAGE,
    followSuccessIfollowersPage,
    followErrorIfollowersPage,
    UNFOLLOW_IFOLLOWERS_PAGE,
    unfollowSuccessIfollowersPage,
    unfollowErrorIfollowersPage,
} from "../actions/ifollowersifollowingActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_IFOLLOWERS:
            // const { id } = store.getState().user.userSlugInfos;
            const id = store.getState().ifollowersifollowing
                .selectedUserIdToFetchSubscriptions.userId;

            httpClient
                .get({
                    url: `/users/${id}/followers`,
                })
                .then((res) => {
                    // console.log(res);

                    store.dispatch(fetchIfollowersSuccess(res.data.data));
                })
                .catch((err) => {
                    console.log({ err });
                    store.dispatch(fetchIfollowersError());
                });
            return;
        case FETCH_IFOLLOWING:
            // const curUserId = store.getState().user.currentUser.id;
            httpClient
                .get({
                    url: `/users/${
                        store.getState().ifollowersifollowing
                            .selectedUserIdToFetchSubscriptions.userId
                    }/followed`,
                })
                .then((res) => {
                    store.dispatch(fetchIfollowingSuccess(res.data.data));
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(fetchIfollowingError());
                });
            return;

        case FOLLOW_IFOLLOWERS_PAGE:
            const curretUser = store.getState().user.currentUser;
            httpClient
                .post(
                    {
                        url: `/users/${curretUser.id}/follow`,
                        data: {
                            followedId: action.payload.id,
                        },
                    },
                    store
                )
                .then((res) => {
                    console.log("follow succes");
                    const followed = [action.payload, ...curretUser.followed];
                    store.dispatch(followSuccessIfollowersPage(followed));
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch(followErrorIfollowersPage());
                });
            return;
        case UNFOLLOW_IFOLLOWERS_PAGE:
            const curUserId = store.getState().user.currentUser.id;
            httpClient
                .delete(
                    {
                        url: `/users/${curUserId}/follow/${action.payload.id}`,
                    },
                    store
                )
                .then(() => {
                    const followed = [...store.getState().user.currentUser.followed];

                    const userIndex = followed.findIndex(
                        (user) => user.id === action.payload.id
                    );
                    if (userIndex > -1) {
                        followed.splice(userIndex);
                    }

                    store.dispatch(unfollowSuccessIfollowersPage(followed));
                })
                .catch((err) => {
                    console.error("unfollow error");
                    store.dispatch(unfollowErrorIfollowersPage());
                });
            return;
        default:
            return;
    }
};
