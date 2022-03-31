import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Home from '../../src/pages';
import '@testing-library/jest-dom/extend-expect';

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  afterEach(() => {
    cleanup();
  });

  test('medaumasenha render', () => {
    expect(screen.getByText('medaumasenha')).toBeInTheDocument();
  });
});
