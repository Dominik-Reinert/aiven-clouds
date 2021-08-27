import * as assert from 'power-assert';
import React from 'react';
import App from '../App';

test('renders without error', () => {
  assert.doesNotThrow(() => <App />)
});
