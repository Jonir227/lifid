import React, { Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Reader, Comment } from 'components';
import { Spinner } from '@blueprintjs/core';


class ReaderView extends React.Component {
  state = {
    novella: {},
    comments: [],
    userData: {},
    load: true,
  };
  componentDidMount() {
    const { docNo } = this.props.match.params;
    axios.get(`/api/novella/reader/${docNo}`)
      .then(this.getUserData)
      .then((res) => {
        this.setState({
          novella: res.novella,
          comments: res.novella.comments,
          userData: res.userData,
          load: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserData = (novelData) => {
    if (typeof novelData.data.novella.author === 'object') {
      return Promise.resolve({
        userData: novelData.data.novella.author,
        novella: novelData.data.novella,
      });
    }
    return new Promise((resolve, reject) => {
      axios.get(`/api/user/${novelData.data.novella.author}`)
        .then((userRes) => {
          resolve({ userData: userRes.data.user, novella: novelData.data.novella });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  regComment = () => {
    const { docNo } = this.props.match.params;
    return commentData => () => {
      if (commentData === '') return;
      axios.post(`/api/novella/reader/${docNo}/comment`, { comment: commentData })
        .then(() => {
          this.setState({
            comments: _.concat(this.state.comments, {
              name: this.props.userData.username,
              comment: commentData,
              time: Date.now(),
            }),
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }

  delComment = () => {
    const { docNo } = this.props.match.params;
    return item => () => {
      axios.delete(`/api/novella/reader/${docNo}/comment?comment=${item.comment}&time=${item.time}`)
        .then((result) => {
          console.log(result);
          this.setState(prevState => ({
            comments: _.reject(prevState.comments, item),
          }));
        });
    };
  }

  render() {
    return (
      <Fragment>
        {
          this.state.load ?
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '8rem',
            }}
            >
              <Spinner />
            </div>
          :
            <Fragment>
              <Reader novella={this.state.novella} author={this.state.userData} />
              <Comment
                isLoggedIn={this.props.isLoggedIn}
                userData={this.props.userData}
                comments={this.state.comments}
                regComment={this.regComment()}
                delComment={this.delComment()}
              />
            </Fragment>
        }
      </Fragment>
    );
  }
}


export default ReaderView;
