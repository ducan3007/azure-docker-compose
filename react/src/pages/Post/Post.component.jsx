import React, { useEffect, Fragment } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../redux/posts/posts.actions";

import PageTitle from "../../components/PageTitle/PageTitle.component";
import LinkButton from "../../components/LinkButton/LinkButton.component";
import Spinner from "../../components/Spinner/Spinner.component";
import AnswerSection from "./AnswerSection/AnswerSection.component";
import QuestionSection from "./QuestionSection/QuestionSection.component";

import "./Post.styles.scss";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, [getPost]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return loading || post === null ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      <PageTitle title={`${post?.title}`} />
      <div id="mainbar" className="post">
        <div className="question-header fc-black-800 pl24">
          <h1>{post?.title}</h1>
          <div>
            <LinkButton
              text={"Ask a question"}
              link={"/add/question"}
              type={"ask-btn"}
            />
          </div>
        </div>
        <div className="question-info fc-black-800 pl24">
          <div className="grid-cell">
            <span className="fc-light">Asked</span>
            <time dateTime={moment(post?.created_at).fromNow(true)}>
              {moment(post?.created_at).fromNow(true)} ago{" "}
            </time>
          </div>
          <div className="grid-cell">
            <span className="fc-light">Viewed</span>
            <span className="fc-dark">{post?.views}</span>
            <span className="fc-dark">times</span>
          </div>
        </div>
        <div className="question-main pl24 pt16">
          <QuestionSection postId={match.params.id} />
          <AnswerSection postId={match.params.id} />
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);