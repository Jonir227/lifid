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
    this.calSections();
    this.calLeftBar();
    window.addEventListener('scroll', this.calPosition);
    window.addEventListener('resize', this.calLeftBar);
  }

  shouldComponentUpdate(prevState) {
    if (prevState.sections !== this.state.sections) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.calPosition.cancel();
    window.removeEventListener('scroll', this.calPosition);
    window.removeEventListener('resize', this.calLeftBar);
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      leftbarDisplay: !prevState.leftbarDisplay,
    }));
  }

  calSections = () => {
    const tmp = document.getElementById('content');
    const ptags = tmp.getElementsByTagName('p');
    let secNo = 0;
    const sections = [];
    for (let i = 0; i < ptags.length; i += 1) {
      if (ptags[i].textContent.startsWith('##')) {
        ptags[i].setAttribute('id', `sec${secNo}`);
        secNo += 1;
        sections.push(ptags[i].textContent);
      } else {
        ptags[i].removeAttribute('id');
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
          <div id="content" className={cx('content')} dangerouslySetInnerHTML={{__html: novella.content}} />
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
