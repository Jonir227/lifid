import React from 'react';
import { TextEditor } from 'components';

const Editor = ({
  userData,
  novelData,
  docNo = 0,
  match,
}) => (
  <TextEditor novelData={novelData} userData={userData} docNumber={docNo} match={match} />
);

export default Editor;
