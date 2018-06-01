import React, { Fragment } from 'react';
import axios from 'axios';
import { TodayNovel, NovellaList } from 'components';
import { Spinner } from '@blueprintjs/core';

class ContentBody extends React.Component {
  state = {
    load: true,
    novelDatas: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pending === false) {
      if (nextProps.isLoggedIn === false) {
        axios.get('/api/novella/search?limit=3')
          .then((res) => {
            this.setState({
              load: false,
              novelDatas: {
                top: [...res.data.novellas],
              },
            });
          })
          .catch((res) => {
            console.log(this.state);
            console.log(res);
          });
        return;
      }
      if (JSON.stringify(this.props.userData) !== JSON.stringify(nextProps.userData)) {
        const { tags } = nextProps.userData;
        tags.forEach((tag) => {
          this.fetchData('tag', tag);
        });
      }
    }
  }

  fetchData = (type, value) => {
    axios.get(`/api/novella/search?type=${type}&value=${value}&limit=3`)
      .then((res) => {
        this.setState(prevState => ({
          load: false,
          novelDatas: Object.assign({}, prevState.novelDatas, { [value]: [...res.data.novellas] }),
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    const {
      novelData,
      userData,
      isLoggedIn,
    } = this.props;

    const {
      novelDatas,
    } = this.state;

    return (
      <Fragment>
        <TodayNovel style={{ padding: 5 }} novelData={novelData} />
        {
          this.state.load ?
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 100,
              }}
            >
              <Spinner />
              <p style={{ marginTop: 10 }}>
                로딩 중입니다
              </p>
            </div>
          :
            React.createElement(
              NovellaList,
              Object.assign({}, { novelData: novelDatas, isLoggedIn }),
            )
        }
      </Fragment>
    );
  }
}

export default ContentBody;
