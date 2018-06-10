import React, { Fragment } from 'react';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import styles from './UserIcon.scss';

const cx = ClassNames.bind(styles);

class UserIcon extends React.PureComponent {
  /*
    Notification Schema
    - type: COMMENT or AUTHOR_NEW_NOVEL : String
    - from: username : String
    - to : username : must same with current user : String
    - location : target document location: String
    - time : Time which event occured : Date
    - read : Boolean
  */
  state = {
    menuOut: false,
  };

  onProfileClick = () => {
    this.setState(prevState => ({
      menuOut: !prevState.menuOut,
    }));
  }

  onClickLogout = () => {
    this.setState({ menuOut: false });
    this.props.logout();
  }

  onRead = (read, _id) => () => {
    return !read && this.props.readNotification(_id);
  }

  onRightClick = () => {
    const {
      isLoggendIn,
      notiOffset,
      notiLimit,
      userData,
    } = this.props;
    this.props.fetchNotifications(isLoggendIn, userData.username, notiOffset, notiLimit, true);
  }
  
  onLeftClick = () => {
    const {
      isLoggendIn,
      notiOffset,
      notiLimit,
      userData,
    } = this.props;
    if (notiOffset < notiLimit) {
      return;
    }
    this.props.fetchNotifications(isLoggendIn, userData.username, notiOffset, notiLimit, false);
  }

  render() {
    const {
      admin,
      username,
    } = this.props.userData;

    const {
      notifications,
      notiCount,
    } = this.props;

    return (
      <Fragment>
        <button className={cx('profile-btn-wrapper')} onClick={this.onProfileClick}>
          <img className={cx('round-icon')} src={`/api/user/profile-pic/${username}`} alt="profile" />
          <div className={cx('circle')}>
            {notiCount}
          </div>
        </button>
        {
          this.state.menuOut &&
          <div className={cx('profile-menu')}>
            {
              notifications.length !== 0 ?
              _.map(notifications, (notifiCation, index) => {
                let notiLine = null;
                switch (notifiCation.type) {
                  case 'COMMENT':
                    notiLine = `내 소설에 ${notifiCation.from}님이 새로운 댓글을 달았습니다`;
                    break;
                  case 'AUTHOR_NEW_NOVEL':
                    notiLine = `팔로우하는 ${notifiCation.from}님이 새 소설을 게시했습니다`;
                    break;
                  default:
                    console.error('invalid input');
                    return;
                }
                let itemStyle = 'noti-item';
                if (notifiCation.read) {
                  itemStyle = 'read-noti-item';
                }
                return (
                  <Link to={`/reader/${notifiCation.location}`} onClick={this.onRead(notifiCation.read, notifiCation._id)}>
                    <div key={index} className={cx(itemStyle)}>
                      <img className={cx('round-icon')} src={`/api/user/profile-pic/${notifiCation.from}`} alt="profile" />
                      <div className={cx('noti-text')}>
                        <div style={{ color: '#8F8F8F' }}>
                          {notiLine}
                        </div>
                        <div>
                          {notifiCation.body}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
              :
              <div>
                알림이 없습니다.
              </div>
            }
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Button className="pt-minimal" icon="caret-left" />
                <Button className="pt-minimal" icon="caret-right" />
              </div>
              <div>
                {
                  (admin !== false) &&
                  <Link to="/admin">
                    <Button className="pt-minimal" icon="build" title="어드민" onClick={this.handleClick} />
                  </Link>
                }
                <Button className="pt-minimal" icon="timeline-line-chart" title="통계" />
                <Button className="pt-minimal" icon="cog" title="설정" />
                <Button className="pt-minimal" icon="log-out" title="로그 아웃" onClick={this.onClickLogout} />
              </div>
            </div>
          </div>
        }
      </Fragment>
    );
  }
}

UserIcon.propTypes = {
  logout: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    admin: PropTypes.bool,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserIcon;
