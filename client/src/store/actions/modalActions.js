export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const CHANGE_ID = "CHANGE_ID";

export const toggleModal = () => ({
    type: TOGGLE_MODAL,
});
export const changeId = (payload) => ({
    type: CHANGE_ID,
    payload,
  });
