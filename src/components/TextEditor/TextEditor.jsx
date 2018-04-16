import React from 'react';
import { Card, Button } from '@blueprintjs/core';
import ReactQuill, { Quill } from 'react-quill';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import { LeftBar } from 'components';
import styles from './TextEditor.scss';
import IDtag from './IDtag';
import './quillTheme.css';

const cx = ClassNames.bind(styles);

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    Quill.register(IDtag);
    this.editor = null;
    this.checkNovel.bind(this);
  }

  state = {
    /*
    text: editor의 내용
    sections: ##[something] 형태로 작성된 것. Table Of Content에 들어간다.
    */
    text: '',
    sections: [],
    lines: 0,
    length: 0,
  }

  componentDidMount() {
    this.editor.focus();
  }

  onChange = (content) => {
    this.setState({ text: content }, this.checkNovel);
    this.updateInsight();
  }

  checkNovel = _.debounce(async () => {
    const tmp = document.getElementById('editor');
    const xpath = "//p[starts-with(text(), '##')]";
    const matchingElements = await document.evaluate(xpath, tmp, null, XPathResult.ANY_TYPE, null);
    let section = matchingElements.iterateNext();
    let secNo = 0;
    const sections = [];
    while (section) {
      section.id = `sec${secNo}`;
      secNo += 1;
      sections.push(section.innerText);
      section = matchingElements.iterateNext();
    }
    if (this.state.sections !== sections) {
      this.setState(() => ({
        sections,
      }));
    }
  }, 250);

  updateInsight = () => {
    this.setState({
      lines: this.editor.getEditor().getLines().length,
      length: this.editor.getEditor().getLength() - 1,
    });
  }

  saveTmp = () => {
  }

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
          />
          <div className={cx('text-wrapper')}>
            <div className={cx('today-novel')}>
              &quot; 항구의 하늘은 방송이 끝난 텔레비전 색이였다 &quot;
            </div>
            <div id="editor">
              <ReactQuill
                ref={(refs) => { this.editor = refs; }}
                className={cx('text-write-area')}
                value={this.state.text}
                placeholder="start your dream"
                onChange={this.onChange}
                modules={this.modules}
              />
            </div>
            <div className={cx('bottom-bar')} >
              <div>
                Lines : {this.state.lines}&nbsp;&nbsp;Length: {this.state.length}
              </div>
              <div>
                <Button className="pt-minimal" icon="floppy-disk" text="저장" onClick={this.saveTmp} />
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
