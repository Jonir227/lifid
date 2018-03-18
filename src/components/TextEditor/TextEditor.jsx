import React from 'react';
import { Card } from '@blueprintjs/core';
import ReactQuill from 'react-quill';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import { LeftBar } from 'components';
import styles from './TextEditor.scss';
import './quillTheme.css';

const cx = ClassNames.bind(styles);

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.quillRef = null;
    this.reactQuillRef = null;
  }

  state = {
    /*
    text: editor의 내용
    contentArr: editor의 내용을 줄로 쪼갠 것.
    sections: ##[something] 형태로 작성된 것. Table Of Content에 들어간다.
    */
    text: '',
    contentArr: [],
    sections: [],
  }

  onChange = (content, delta, source, editor) => {
    this.setState({ text: content });
    const ctnt = editor.getText();
    if (delta.ops[1] !== undefined
        && (delta.ops[1].insert === '\n'
          || delta.ops[1].insert === '#'
          || delta.ops[1].length > 1
          || delta.ops[1].delete >= 1)) {
      const ctntArr = ctnt.slice(0, ctnt.length - 2).split('\n');
      const sec = _.filter(ctntArr, str => str.startsWith('##'));
      this.setState({
        contentArr: ctntArr,
        sections: sec,
      });
    }
  }

  render() {
    return (
      <div className={cx('editor')}>
        <Card className={cx('card-wrapper')}>
          <LeftBar sections={this.state.sections} />
          <div className={cx('text-wrapper')}>
            <div className={cx('today-novel')}>
              &quot; 항구의 하늘은 방송이 끝난 텔레비전 색이였다 &quot;
            </div>
            <ReactQuill
              className={cx('text-write-area')}
              value={this.state.text}
              placeholder="start your dream"
              onChange={this.onChange}
            />
            <div className={cx('insight-line')} >
              line count: {this.state.contentArr.length}&nbsp;&nbsp;&nbsp;
              word count: {this.state.contentArr.reduce((prev, curr) => (prev + curr.split(' ').length), 0)}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default TextEditor;
