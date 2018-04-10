import React, { Fragment } from 'react';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import styles from './UserIcon.scss';

const cx = ClassNames.bind(styles);

class UserIcon extends React.Component {
  state = {
    menuOut: false,
    notifiCations: [
      {
        checked: 'false',
        from: 'myarticle',
        who: 'bjbj6363@gmail.com',
        type: 'comment',
        data: '좋은 글 감사합니다.',
        read: false,
      },
      {
        checked: 'false',
        from: 'myarticle',
        who: 'bjbj6363@gmail.com',
        type: 'comment',
        data: '좋은 글 감사합니다.',
        read: true,
      },
      {
        checked: 'false',
        from: 'myarticle',
        who: 'bjbj6363@gmail.com',
        type: 'comment',
        data: '좋은 글 감사합니다.',
        read: false,
      },
    ],
  };

  componentDidMount() {
  }

  onProfileClick = () => {
    this.setState(prevState => ({
      menuOut: !prevState.menuOut,
    }));
  }

  render() {
    const {
      username,
    } = this.props.userData;

    return (
      <Fragment>
        <button className={cx('profile-btn-wrapper')} onClick={this.onProfileClick}>
          <img className={cx('round-icon')} src={`/api/user/profile-pic/${username}`} alt="profile" />
          <div className={cx('circle')}>
            {_.reduce(this.state.notifiCations, (prev, curr) => (!curr.read ? prev + 1 : prev), 0)}
          </div>
        </button>
        {
          this.state.menuOut &&
          <div className={cx('profile-menu')}>
            {
              _.map(this.state.notifiCations, (notifiCation) => {
                let notiLine = null;
                switch (notifiCation.type) {
                  case 'comment':
                    notiLine = `내 소설에 ${notifiCation.who}님이 새로운 댓글을 달았습니다`;
                    break;
                  case 'author':
                    notiLine = `팔로우하는 ${notifiCation.who}님이 새 소설을 게시했습니다`;
                    break;
                  default:
                    console.log('invalid input');
                    return;
                }
                let itemStyle = 'noti-item';
                if (notifiCation.read) {
                  itemStyle = 'read-noti-item';
                }
                return (
                  <div className={cx(itemStyle)}>
                    <img className={cx('round-icon')} src={`/api/user/profile-pic/${notifiCation.who}`} alt="profile" />
                    <div className={cx('noti-text')}>
                      <div style={{ color: '#8F8F8F' }}>
                        {notiLine}
                      </div>
                      <div>
                        {notifiCation.data}
                      </div>
                    </div>
                  </div>);
              })
            }
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Button className="pt-minimal" icon="cog" text="내 설정" />
            </div>
          </div>
        }
      </Fragment>
    );
  }
}
export default UserIcon;
