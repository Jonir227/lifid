import React, { Fragment } from 'react';
import { TodayNovel, NovellaList } from 'components';

class ContentBody extends React.Component {
  state = {
    novelData: [{
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;tlkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    ],
    todayNovel: {
      name: 'neuromancer',
      quotation: '항구의 하늘은 방송이 끝난 텔레비전 색이였다.',
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
