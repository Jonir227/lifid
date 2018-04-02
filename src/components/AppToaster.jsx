import { Position, Toaster } from '@blueprintjs/core';

const AppToaster = Toaster.create({
  className: 'recipe-toaster',
  position: Position.Top,
});

export default AppToaster;
