import { connect } from "react-redux";
import LikeAndFavoris from "../components/Irecords/LikeAndFavoris";
import {
  addFavoris,
  addLikes,
  unlikes,
  unFavoris,
  fetchFavoris,
  fetchLikes
} from "../store/actions/likeAndFavorisActions";

const mapStateToProps = state => ({
  favorisUser: state.likeAndFavorisReducer.allFavoris,
  likesUser: state.likeAndFavorisReducer.allLikes
});

const mapDispatchToProps = dispatch => ({
  addFavoris: record => {
    dispatch(addFavoris(record));
  },
  unFavoris: recordId => {
    dispatch(unFavoris(recordId));
  },
  addLikes: record => {
    dispatch(addLikes(record));
  },
  unlikes: recordId => {
    dispatch(unlikes(recordId));
  },
  fetchFavoris: () => {
    dispatch(fetchFavoris());
  },
  fetchLikes: () => {
    dispatch(fetchLikes());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndFavoris);
