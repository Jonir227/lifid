import React, { Fragment } from 'react';
import ClassNames from 'classnames/bind';
import { LeftBar } from 'components';
import 'styles/quillTheme.css';
import styles from './Reader.scss';

const cx = ClassNames.bind(styles);

class Reader extends React.Component {
  state = {
    sections: [],
  }
  componentDidMount() {
    this.calSections();
  }


  shouldComponentUpdate(prevState) {
    if (prevState.sections !== this.state.sections) {
      return true;
    }
    return false;
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
  render() {
    const {
      novella,
    } = this.props;
    return (
      <Fragment>
        <div className={cx('title')}>{novella.title}</div>
        <div className={cx('author')}>{novella.author}</div>
        <LeftBar className={cx('left-bar')} sections={this.state.sections} />
        <div>
          <div className={cx('quotation')}>{novella.todayNovel.quotation}</div>
          <div id="content" className={cx('content')} dangerouslySetInnerHTML={{__html: novella.content}} />
        </div>
        <div>

        </div>
      </Fragment>
    );
  }
}

export default Reader;
