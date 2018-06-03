import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { InputGroup, Button } from '@blueprintjs/core';
import styles from './SearchBar.scss';

const cx = ClassNames.bind(styles);

class SearchBar extends React.Component {
  state = {
    isMouseIn: false,
    searchMode: 'title',
  }

  onBlur = () => {
    if (!this.state.isMouseIn) {
      this.props.toggleSearchBar();
    }
  }

  render() {
    const {
      isSuportOut,
      searchMode,
    } = this.state;

    return (
      <div className={cx('search-bar')}>
        <InputGroup
          className="pt-round"
          placeholder="search"
          leftIcon="search"
          rightElement={<Button className="pt-minimal" icon="arrow-right" />}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoFocus
        />
        <div
          className={cx('support-bar')}
          onMouseEnter={() => { this.setState({ isMouseIn: true }); }}
          onMouseLeave={() => { this.setState({ isMouseIn: false }); }}
        >
          <Button text="title" className="pt-minimal" />
          <Button text="author" className="pt-minimal" />
          <Button text="quotation" className="pt-minimal" />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  toggleSearchBar: PropTypes.func.isRequired,
};

export default SearchBar;
