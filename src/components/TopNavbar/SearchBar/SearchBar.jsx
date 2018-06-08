import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { InputGroup, Button, Switch } from '@blueprintjs/core';
import styles from './SearchBar.scss';

const cx = ClassNames.bind(styles);

class SearchBar extends React.Component {
  state = {
    isMouseIn: false,
    searchMode: 'title',
    input: '',
    isCurretQuote: true,
    pressEnter: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onPressEnter);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressEnter);
  }

  onBlur = () => {
    if (!this.state.isMouseIn) {
      this.props.toggleSearchBar();
    }
  }

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  }

  onSwitchChange = () => {
    this.setState(prevState => ({
      isCurretQuote: !prevState.isCurretQuote,
    }));
  }

  onPressEnter = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    this.setState({
      pressEnter: true,
    });
  }

  changeSearchState = (state, input) => () => {
    this.setState(() => ({
      searchMode: state,
    }));
    input._reactInternalFiber.child.stateNode.childNodes[1].focus();
  };

  isActive = item => (this.state.searchMode === item)

  render() {
    const {
      searchMode,
      input,
      isCurretQuote,
      pressEnter,
    } = this.state;

    const todayNovel = isCurretQuote ? `&today_novel=${this.props.novelData.name}` : '';

    return (
      <div
        className={cx('search-bar')}
        onMouseEnter={() => { this.setState({ isMouseIn: true }); }}
        onMouseLeave={() => { this.setState({ isMouseIn: false }); }}
      >
        {
          pressEnter &&
            (() => {
              this.setState({ pressEnter: false });
              return <Redirect to={`/search/?type=${searchMode}&value=${input}${todayNovel}`} push />;
            })()
        }
        <InputGroup
          className="pt-round"
          placeholder="search"
          leftIcon="search"
          rightElement={
            <Link to={`/search/?type=${searchMode}&value=${input}${todayNovel}`}>
              <Button className="pt-minimal" icon="arrow-right" />
            </Link>
          }
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          ref={(e) => { this.input = e; }}
          autoFocus
        />
        <div
          className={cx('support-bar')}
        >
          <Button text="title" active={this.isActive('title')} className="pt-minimal" onClick={this.changeSearchState('title', this.input)} />
          <Button text="author" active={this.isActive('author')} className="pt-minimal" onClick={this.changeSearchState('author', this.input)} />
          <Button text="tag" active={this.isActive('quotation')} className="pt-minimal" onClick={this.changeSearchState('tag', this.input)} />
          <Switch
            checked={isCurretQuote}
            onChange={this.onSwitchChange}
            className={cx('switch')}
            label="이번 주제만"
            large
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  toggleSearchBar: PropTypes.func.isRequired,
  novelData: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchBar;
