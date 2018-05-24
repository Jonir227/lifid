import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import moment from 'moment';
import { Card, Button, Icon } from '@blueprintjs/core';
import styles from './TodayNovel.scss';

const cx = ClassNames.bind(styles);
class TodayNovel extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
  }

  state = {
    time: {
      days: '00',
      hours: '00',
      min: '00',
      sec: '00',
    },
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime = () => {
    const diffTime = moment(this.props.novelData.dueDate).diff(Date.now());
    const times = moment(diffTime).format('DD hh mm ss').split(' ');
    this.setState({
      time: {
        days: times[0],
        hours: times[1],
        min: times[2],
        sec: times[3],
      },
    });
  };

  render() {
    const {
      time,
    } = this.state;
    return (
      <Card className={cx('pt-card')} interactive >
        <img src="http://lastbookstorela.com/wp-content/uploads/2014/11/bookholelarge.jpg" alt="None" />
        <div className={cx('novel-contents')}>
          <div className={cx('novel-quotation')}>
            <div className={cx('novel-info')}>today&apos;s novel is {this.props.novelData.name}</div>
            <div className={cx('novel-info')}>&quot; {this.props.novelData.quotation} &quot;</div>
          </div>
          <div className={cx('time-counter')}>
            <div className={cx('time-counter-item')}>
              <div className={cx('time')}>
                {time.days}
              </div>
              <div className={cx('desc')}>
                days
              </div>
            </div>
            <div className={cx('time-counter-item')}>
              <div className={cx('time')}>
                {time.hours}
              </div>
              <div className={cx('desc')}>
                hours
              </div>
            </div>
            <div className={cx('time-counter-item')}>
              <div className={cx('time')}>
                {time.min}
              </div>
              <div className={cx('desc')}>
                min
              </div>
            </div>
            <div className={cx('time-counter-item')}>
              <div className={cx('time')}>
                {time.sec}
              </div>
              <div className={cx('desc')}>
                sec
              </div>
            </div>
          </div>
          <div className={cx('scale')}>
            <div className={cx('button')}>
              <Link to="/my-novellas/editor">
                <Button className="pt-minimal" icon={<Icon icon="edit" color="white" />} text={<div style={{ color: 'white' }}>start writing</div>} />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

TodayNovel.propTypes = {
  novelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quotation: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};


export default TodayNovel;
