import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Page from '../../src/components/Page';
import '@testing-library/jest-dom/extend-expect';

describe('Page component', () => {
  beforeEach(() => {
    render(<Page>Testing</Page>);
  });

  afterEach(() => {
    cleanup();
  });

  test('Children render', () => {
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });
});
