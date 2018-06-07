import React, { Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { TodayNovel, NovellaList } from 'components';
import { Spinner } from '@blueprintjs/core';

class ContentBody extends React.Component {
  state = {
    load: true,
    novelDatas: {},
  }

  componentDidMount() {
    if (this.props.pending || this.props.novelData.name === '') {
      return;
    }
    this.setNotLoginData(this.props.novelData.name);
    if (this.props.isLoggedIn === false) {
      return;
    }
    this.setLoginedData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps) && nextProps.novelData.name !== '') {
      this.setNotLoginData(nextProps);
      if (nextProps.isLoggedIn === false) {
        return;
      }
      this.setLoginedData(nextProps);
    }
  }

  setLoginedData = (props) => {
    const { tags } = props.userData;
    const { name } = props.novelData;
    tags.map((tag) => {
      this.fetchData('tag', tag, name);
    });
  }

  setNotLoginData = (nextProps) => {
    const {
      novelData,
      isLoggedIn,
    } = nextProps;
    axios.get(`/api/novella/search?today_novel=${novelData.name}&limit=3`)
      .then((res) => {
        this.setState(prevState => ({
          load: false,
          novelDatas: isLoggedIn ?
            Object.assign({}, {
              top: [...res.data.novellas],
            }, prevState.novelDatas)
            :
            { top: [...res.data.novellas] },
        }));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  fetchData = (type, value, name) => {
    axios.get(`/api/novella/search?type=${type}&today_novel=${name}&value=${value}&limit=3`)
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
          // main contents
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
              Object.assign({}, { novelData: novelDatas, isLoggedIn, todayNovel: novelData.name }),
            )
        }
      </Fragment>
    );
  }
}

export default ContentBody;
