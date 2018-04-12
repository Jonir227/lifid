import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Card, Button, Icon } from '@blueprintjs/core';
import styles from './TodayNovel.scss';

const cx = ClassNames.bind(styles);
class TodayNovel extends Component {
  state = {}
  render() {
    return (
      <Fragment>
        <Card className={cx('pt-card')} interactive >
          <img src="http://lastbookstorela.com/wp-content/uploads/2014/11/bookholelarge.jpg" alt="None" />
          <div className={cx('todayNovel-contents')}>
            <div className={cx('todayNovel-quotation')}>
              <h3 className={cx('todayNovel-info')}>today&apos;s novel is <strong>{this.props.todayNovelData.name}</strong>.</h3>
              <br />
              <h2 className={cx('todayNovel-info')}>&quot; {this.props.todayNovelData.quotation} &quot;</h2>
              <div className={cx('scale')}>
                <div className={cx('button')}>
                  <Link to="/editor">
                    <Button onClick=""className="pt-minimal" icon={<Icon icon="edit" color="white" />} text={<div style={{ color: 'white' }}>start writing</div>} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Fragment>
    );
  }
}

TodayNovel.propTypes = {
  todayNovelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quotation: PropTypes.string.isRequired,
  }).isRequired,
};


export default TodayNovel;
