import React, { Fragment } from 'react';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import { Button } from '@blueprintjs/core';
import { LeftBar } from 'components';
import 'styles/quillTheme.css';
import styles from './Reader.scss';

const cx = ClassNames.bind(styles);

class Reader extends React.Component {
  state = {
    sections: [],
    leftbarDisplay: true,
    isWidthSmall: false,
    percent: 0,
  }

  componentDidMount() {
    // 섹션 계산
    this.calSections();
    // LeftBar가 랜더되어야 하는지 판단
    this.calLeftBar();
    // 포지션 계산으로 Reader 프로그래스 바 계산하는 이벤트리스너
    window.addEventListener('scroll', this.calPosition);
    // 리사이즈 되었을 때 LeftBar를 나오게 할 건지 여부
    window.addEventListener('resize', this.calLeftBar);
  }

  componentWillUnmount() {
    // throttle 중인 작업이 있다면 취소시킴
    this.calPosition.cancel();
    // 이벤트 리스너 제거
    window.removeEventListener('scroll', this.calPosition);
    window.removeEventListener('resize', this.calLeftBar);
  }

  // LeftBar를 토글하는 함수
  onButtonClick = () => {
    this.setState(prevState => ({
      leftbarDisplay: !prevState.leftbarDisplay,
    }));
  }

  calSections = () => {
    const tmp = document.getElementById('content');
    const ptags = tmp.getElementsByTagName('p');
    const sections = [];
    for (let i = 0; i < ptags.length; i += 1) {
      if (ptags[i].textContent.startsWith('##')) {
        sections.push(ptags[i].textContent);
      }
    }
    this.setState(() => ({
      sections,
    }));
  }

  calPosition = _.throttle(() => {
    const novelHeight = document.getElementById('content').offsetHeight - (window.innerHeight - 50);
    const currHeight = window.scrollY;
    if (novelHeight - currHeight >= 0) {
      this.setState({
        percent: (currHeight / novelHeight) * 100,
      });
    } else {
      this.setState({
        percent: 100,
      });
    }
  }, 50);

  calLeftBar = () => {
    if (window.innerWidth <= 1100) {
      this.setState({
        isWidthSmall: true,
        leftbarDisplay: false,
      });
    } else {
      this.setState({
        isWidthSmall: false,
        leftbarDisplay: true,
      });
    }
  }

  render() {
    const {
      novella,
      author,
    } = this.props;

    return (
      <Fragment>
        <div style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          height: 5,
          position: 'sticky',
          top: 0,
          }}
        >
          <div style={{
            backgroundColor: '#159ec6',
            height: 5,
            width: `${this.state.percent}%`,
            }}
          />
        </div>
        <div>
          <div className={cx('views')}>{novella.views} views</div>
          <div className={cx('title')}>{novella.title}</div>
          <div className={cx('quotation')}>{novella.todayNovel.quotation}</div>
          <div id="content" className={cx('content')} dangerouslySetInnerHTML={{ __html: novella.content }} />
          <div className={cx('author-wrapper')}>
            <div className={cx('author')}>{novella.author}</div>
            <div className={cx('author-description')}>{author.description}</div>
          </div>
          <div className={cx('divider')} />
          {/* fixed Postion Element */}
          {
            !this.state.isWidthSmall ?
              <LeftBar className={cx('left-bar')} sections={this.state.sections} />
            :
              <Fragment>
                {
                  this.state.leftbarDisplay ?
                    <Fragment>
                      <LeftBar className={cx('left-bar')} sections={this.state.sections} />
                      <div className={cx('left-btn')}>
                        <Button className="pt-minimal pt-large" icon="arrow-left" onClick={this.onButtonClick} />
                      </div>
                    </Fragment>
                  :
                    <div className={cx('left-btn')}>
                      <Button className="pt-minimal pt-large" icon="arrow-right" onClick={this.onButtonClick} />
                    </div>
                }
              </Fragment>
          }
        </div>
      </Fragment>
    );
  }
}

export default Reader;
