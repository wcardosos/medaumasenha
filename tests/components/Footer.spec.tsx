import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../src/components/Footer';
import '@testing-library/jest-dom/extend-expect';

describe('Component: Footer', () => {
  it('Should render the footer', () => {
    render(<Footer />);

    expect(screen.getByText('Feito por Wagner Cardoso Development')).toBeInTheDocument();
  });
});
