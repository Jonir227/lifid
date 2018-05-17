import React from 'react';
import PropType from 'prop-types';
import { TextEditor } from 'components';

const Editor = ({ userData, novelData, docNo = 0, match}) => (
  <TextEditor novelData={novelData} userData={userData} docNumber={docNo} match={match} />
);

export default Editor;
