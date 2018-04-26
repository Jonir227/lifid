import React, { Fragment } from 'react';
import { TodayNovel, NovellaList } from 'components';

class ContentBody extends React.Component {
  state = {
    novelData: [{
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;tlkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    ],
    todayNovel: {
      name: 'neuromancer',
      quotation: '항구의 하늘은 방송이 끝난 텔레비전 색이였다.',
      dueDate: '2018-04-30',
    },
  }

  render() {
    return (
      <Fragment>
        <TodayNovel style={{ padding: 5 }} todayNovelData={this.state.todayNovel} />
        <NovellaList novelData={this.state.novelData} />
      </Fragment>
    );
  }
}

export default ContentBody;
