import React from 'react';
import { Card, Button, Spinner, Intent } from '@blueprintjs/core';
import ReactQuill from 'react-quill';
import ClassNames from 'classnames/bind';
import _ from 'lodash';
import axios from 'axios';
import { LeftBar, AppToaster } from 'components';
import styles from './TextEditor.scss';
import './quillTheme.css';

const cx = ClassNames.bind(styles);

// TODO: title field 추가
class TextEditor extends React.Component {
  constructor(props) {
    super(props);
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
    lastSaved: 'none',
    tmpSavePending: false,
    publishPending: false,
  }

  componentDidMount() {
    this.editor.focus();
  }

  onChange = (content) => {
    this.setState({ text: content }, this.checkNovel);
    this.saveWorker();
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
    const tmp = this.editor.getEditor();
    this.setState({
      tmpSavePending: true,
    });
    const contentHTML = tmp.container.querySelector('.ql-editor').innerHTML;
    axios.post('/api/novella', {
      content: contentHTML,
      quillDelta: tmp.getContents(),
      title: 'title',
      published_date: Date.now(),
      isPublished: false,
    })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            tmpSavePending: false,
            lastSaved: new Date(Date.now()).toLocaleString(),
          });
          AppToaster.show({
            message: '임시 저장되었습니다',
            intent: Intent.PRIMARY,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  saveWorker = _.debounce(this.saveTmp, 1000 * 60 * 5);

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
                <br />
                Saved: {this.state.lastSaved}
              </div>
              <div>
                {
                  this.state.tmpSavePending ?
                    <Spinner className={cx('spinner')} />
                  :
                    <Button className="pt-minimal" icon="floppy-disk" text="저장" onClick={this.saveTmp} />
                }
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
