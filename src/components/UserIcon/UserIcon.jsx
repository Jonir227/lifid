import React, { Fragment } from 'react';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './UserIcon.scss';

const cx = ClassNames.bind(styles);

class UserIcon extends React.Component {
  state = {
    menuOut: false,
    notifiCations: [
      {
        checked: 'false',
        from: 'myarticle',
        who: 'bjbj6363',
        type: 'comment',
        data: '좋은 글 감사합니다.',
      },
      {
        checked: 'false',
        from: 'myarticle',
        who: 'bjbj6363',
        type: 'comment',
        data: '좋은 글 감사합니다.',
      },
      {
        checked: 'false',
        from: 'myarticle',
        who: 'bjbj6363',
        type: 'comment',
        data: '좋은 글 감사합니다.',
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
        </button>
        {
          this.state.menuOut &&
          <div className={cx('profile-menu')}>
            {
              _.map(this.state.notifiCations, (notifiCation) => {
                return <div>{notifiCation.who} {notifiCation.data}</div>;
              })
            }
            <div>
              내 설정
            </div>
          </div>
        }
      </Fragment>
    );
  }
}
export default UserIcon;
