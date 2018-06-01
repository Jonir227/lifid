import React, { Fragment } from 'react';
import axios from 'axios';
import { TodayNovel, NovellaList } from 'components';
import { Spinner } from '@blueprintjs/core';

class ContentBody extends React.Component {
  state = {
    load: true,
    novelDatas: {},
  }

  componentDidMount() {
    if (!this.props.pending) {
      if (this.props.isLoggedIn) {
        this.setNotLoginData();
        this.setLoginedData(this.props);
      } else {
        this.setNotLoginData();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pending === false) {
      if (nextProps.isLoggedIn === false) {
        this.setNotLoginData();
        return;
      }
      if (JSON.stringify(this.props.userData) !== JSON.stringify(nextProps.userData)) {
        this.setNotLoginData();
        this.setLoginedData(nextProps);
      }
    }
  }

  setLoginedData = (props) => {
    const { tags } = props.userData;
    tags.map((tag) => {
      this.fetchData('tag', tag);
    });
  }

  setNotLoginData = () => {
    axios.get('/api/novella/search?limit=3')
      .then((res) => {
        this.setState(prevState => ({
          load: false,
          novelDatas: Object.assign({}, {
            top: [...res.data.novellas],
          }, prevState.novelDatas),
        }));
      })
      .catch((res) => {
        console.log(res);
      });
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
