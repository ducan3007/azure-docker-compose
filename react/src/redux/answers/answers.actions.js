import { GET_ANSWERS, ANSWER_ERROR, ADD_ANSWER, DELETE_ANSWER } from "./answers.types";

import axios from "axios";
import { setAlert } from "../alert/alert.actions";
import { getPost } from "../posts/posts.actions";
import { GET_POST } from "../posts/posts.types";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
export const getAnswers = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/answers/${id}`);

    dispatch({
      type: GET_ANSWERS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status },
    });
  }
};
export const Vote = (postId, answerId, voteAction) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/vote/answer/${answerId}/${voteAction}`);
    dispatch({
      type: GET_POST,
      payload: res.data.data,
    });
    dispatch(getPost(postId));
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status },
    });
  }
};

// Add Answer
export const addAnswer = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/posts/answers/${postId}`, formData, config);

    dispatch({
      type: ADD_ANSWER,
      payload: res.data.data,
    });

    dispatch(getAnswers(postId));
    dispatch(getPost(postId));
  } catch (err) {
    dispatch(setAlert(err?.response?.data?.message || "", "danger"));
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status },
    });
  }
};

// Delete Answer
export const deleteAnswer = (postId, AnswerId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/answers/${AnswerId}`);

    dispatch({
      type: DELETE_ANSWER,
      payload: AnswerId,
    });
    dispatch(getAnswers(postId));
    dispatch(getPost(postId));
  } catch (err) {
    dispatch(setAlert(err?.response?.data?.message || "", "danger"));

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status },
    });
  }
};
