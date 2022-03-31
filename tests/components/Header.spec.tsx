import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';
import '@testing-library/jest-dom/extend-expect';

describe('Header component', () => {
  beforeEach(() => {
    render(<Header />);
  });

  afterEach(() => {
    cleanup();
  });

  test('Logo render', () => {
    expect(screen.getByAltText('Logo medaumasenha')).toBeInTheDocument();
  });
});
