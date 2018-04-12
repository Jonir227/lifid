import React from 'react';
import { Card, Button } from '@blueprintjs/core';
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
    this.editor = null;
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

  componentDidMount() {
    this.editor.focus();
  }

  onChange = (content, delta, source, editor) => {
    this.setState({ text: content });
    // --- 조건부 체크를 할지? Debounce를 할지? ---
    // -- 조건부 체크 파트
    // if (delta.ops[1] !== undefined
    //     && (delta.ops[1].insert === '\n'
    //       || delta.ops[1].insert === '#'
    //       || delta.ops[1].length > 1
    //       || delta.ops[1].delete >= 1)) {
    //   const ctntArr = ctnt.slice(0, ctnt.length - 2).split('\n');
    //   const secs = {};
    //   _.forEach(ctntArr, (str, index) => {
    //     if (str.startsWith('##')) {
    //       secs[index] = str;
    //     }
    //   });
    //   this.setState({
    //     contentArr: ctntArr,
    //     sections: secs,
    //   });
    // -- Debounce 파트
    this.inspectNovel(editor.getText());
  }

  inspectNovel = _.debounce((editorText) => {
    const ctntArr = editorText.slice(0, editorText.length - 2).split('\n');
    const secs = {};
    _.forEach(ctntArr, (str, index) => {
      if (str.startsWith('##')) {
        secs[index] = str;
      }
    });
    this.setState({
      contentArr: ctntArr,
      sections: secs,
    });
  }, 250);

  indexFunction = index =>
    () => {
      this.editor.editingArea.firstElementChild.scrollTop =
        this.editor.editingArea.firstElementChild.scrollHeight *
        (index / this.state.contentArr.length);
    };

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  render() {
    return (
      <div className={cx('editor')}>
        <Card className={cx('card-wrapper')}>
          <LeftBar
            sections={this.state.sections}
            indexFunction={this.indexFunction}
          />
          <div className={cx('text-wrapper')}>
            <div className={cx('today-novel')}>
              &quot; 항구의 하늘은 방송이 끝난 텔레비전 색이였다 &quot;
            </div>
            <ReactQuill
              ref={(refs) => { this.editor = refs; }}
              className={cx('text-write-area')}
              value={this.state.text}
              placeholder="start your dream"
              onChange={this.onChange}
              modules={this.modules}
            />
            <div className={cx('bottom-bar')} >
              <div >
                Line : {this.state.contentArr.length}&nbsp;&nbsp;&nbsp;
                Word : {this.state.contentArr.reduce((prev, curr) => (prev + curr.split(' ').length), 0)}
              </div>
              <div>
                <Button className="pt-minimal" icon="floppy-disk" text="저장" onClick={() => {console.log('clicked')}}/>
                <Button className="pt-minimal" icon="draw" text="게시" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default TextEditor;
