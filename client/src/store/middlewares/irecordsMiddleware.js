import axios from "axios";
import { httpClient } from "../../utils";
import {
  SEND_IRECORDS_RECORDED,
  FETCH_ALL_RECORDS,
  sendIrecordSuccessIrecordsPage,
  sendIrecordSuccessUserProfile,
  sendIrecordsError,
  fetchAllRecordsSuccess,
  fetchAllRecordsError,
  FETCH_EXPRESSIONS,
  fetchAllExpressionsSuccess,
  fetchAllExpressionsError,
  DELETE_IRECORD,
  deleteIrecordSuccessIrecordsPage,
  deleteIrecordSuccessUserProfile,
  deleteIrecordError
} from "../actions/irecordsActions";

import {
  COMMENT_SUBMIT,
  commentSubmitSuccess,
  commentSubmitError,
  DELETE_COMMENT,
  deleteCommentSuccess,
  deleteCommentError,
  UPDATE_COMMENT,
  updateCommentSuccess,
  updateCommentError,
} from "../actions/commentActions";

export const irecordsMiddleware = store => next => action => {
  next(action);
  switch (action.type) {
    case SEND_IRECORDS_RECORDED:
      const user = store.getState().user.currentUser;
      let translationId = store.getState().irecords.languageId;
      translationId = translationId.toString();

      fetch(action.payload)
        .then(audio => audio.blob())
        .then(blob => {
          console.log(blob);
          const file = new File([blob], "record.mp3", {
            type: blob.type
          });

          const formData = new FormData();
          formData.append("record", file);
          formData.append("translation_id", translationId);

          httpClient
            .post(
              {
                url: `/users/${user.id}/record`,
                data: formData,
                headers: { "Content-Type": `multipart/form-data` }
              },
              store
            )
            .then(res => {
              const { record } = res.data.data;
              record.user = user;
              store.dispatch(sendIrecordSuccessUserProfile(record));
              store.dispatch(sendIrecordSuccessIrecordsPage(record));
            })
            .catch(err => {
              console.log(err);
              store.dispatch(sendIrecordsError());
            });
        });

      break;
    case FETCH_ALL_RECORDS: {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/records`
      })
        .then(res => {
          const records = res.data.data;
          const recordsWithType = records.map(record => {
            return {
              ...record,
              type: "audio"
            };
          });
          store.dispatch(fetchAllRecordsSuccess(recordsWithType));
        })
        .catch(err => {
          store.dispatch(
            fetchAllRecordsError(
              "Un problème est survenue lors du chargement de la liste des iRecords"
            )
          );
          console.error(err);
        });
      break;
    };
    case FETCH_EXPRESSIONS:
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/expressions`
      })
        .then(res => {
          const expressions = res.data.data;
          store.dispatch(fetchAllExpressionsSuccess(expressions));
        })
        .catch(err => {
          store.dispatch(
            fetchAllExpressionsError(
              "Un problème est survenue lors du chargement de la liste des expressions"
            )
          );
          console.error(err);
        });
      break;
    case DELETE_IRECORD:
      const { id } = store.getState().user.currentUser;

      axios({
        method: "DELETE",
        url: `https://itongue.herokuapp.com/users/${id}/record/${action.payload}`,
        headers: {
          Authorization: `Bearer ${store.getState().user.accessToken}`
        }
      })
        .then(() => {
          /* update state of the records of the user slug infos */
          const recordsUserProfile = store.getState().user.userSlugInfos.records;
          const recordsUserProfileUpdatedPostDelete = recordsUserProfile.filter(
            record => record.id !== action.payload
          );

          store.dispatch(deleteIrecordSuccessUserProfile(recordsUserProfileUpdatedPostDelete));

          /* Update state of all iRecords */

          const recordIrecordsPage = store.getState().irecords.allRecordsList;
          const recordsIrecordsPageUpdatedPostDelete = recordIrecordsPage.filter(
            record => record.id !== action.payload
          );

          store.dispatch(deleteIrecordSuccessIrecordsPage(recordsIrecordsPageUpdatedPostDelete));
        })
        .catch(() => {
          store.dispatch(deleteIrecordError());
        });
      break;
    
    case COMMENT_SUBMIT :
        const { commentInputValue } = store.getState().irecords;
        console.log("commentInputValue", commentInputValue);
        const recordId = action.payload;
        httpClient
          .post(
            {
              url: `/comments/${recordId}`,
              data: {
                text: commentInputValue,
              },
            },
            store
          )
          .then(res => {
            console.log("res", res);
            store.dispatch(commentSubmitSuccess());
          })
          .catch(err => {
            console.error(err);
            //store.dispatch(commentSubmitError(      ));
          });
          
    break;
    case DELETE_COMMENT :
        httpClient
          .delete(
            {
              url: ``,
            },
            store
          )
          .then(res => {
            console.log("res", res);
          })
          .catch(err => {
            console.error(err);
          });
          
    break;
    case UPDATE_COMMENT :
        httpClient
          .post(
            {
              url: ``,
              data: "dataform",
            },
            store
          )
          .then(res => {
            console.log("res", res);
          })
          .catch(err => {
            console.error(err);
          });
          
    break;
    
    default:
      return;
  }
};
