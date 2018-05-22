import React, { Fragment } from 'react';
import axios from 'axios';
import { Reader, Comment } from 'components';

class ReaderView extends React.Component {
  state = {
    novella: {},
    comments: [],
    author: {},
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
          author: res.userData,
          load: false,
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  getUserData = (novelData) => {
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
      axios.post(`/api/novella/reader/${docNo}/comment`, { comment: commentData })
        .then(() => {
          this.setState({
            comments: _.concat(this.state.comments, {
              name: this.state.author.username,
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

  render() {
    console.log(this.state.novella.comments);
    return (
      <Fragment>
        {
          !this.state.load &&
          <Fragment>
            <Reader novella={this.state.novella} author={this.state.author} />
            <Comment comments={this.state.comments} regComment={this.regComment()} />
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default ReaderView;
