import * as React from 'react';
import renderer from 'react-test-renderer';

import { TextField } from '../TextField';

it(`renders correctly`, () => {
  const tree = renderer.create(<TextField value="" onChange={()=>{}}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
