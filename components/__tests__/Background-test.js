import * as React from 'react';
import renderer from 'react-test-renderer';

import { MonoText } from '../StyledText';
import { Background } from '../Background';

it(`renders correctly`, () => {
  const tree = renderer.create(<Background><MonoText>Snapshot test!</MonoText></Background>).toJSON();

  expect(tree).toMatchSnapshot();
});
