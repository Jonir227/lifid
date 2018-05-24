import React, { Fragment } from 'react';
import axios from 'axios';
import { TodayNovel, NovellaList } from 'components';
import { Spinner } from '@blueprintjs/core';

class ContentBody extends React.Component {
  state = {
    load: true,
    novelDatas: [],
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('/api/novella/reader?limit=5')
      .then((res) => {
        this.setState(() => ({
          load: false,
          novelDatas: res.data.novellas,
        }));
      })
      .catch((error) => {
        console.error(error);
      })
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
              Object.assign({}, { userData, isLoggedIn, novelData: novelDatas })
            )
        }
      </Fragment>
    );
  }
}

export default ContentBody;
