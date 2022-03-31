import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordGenerator } from '../../src/lib/PasswordGenerator';
import Home from '../../src/pages';
import '@testing-library/jest-dom/extend-expect';

describe('Home page', () => {
  const generateAlphaNumericMock = jest.spyOn(PasswordGenerator, 'generateAlphanumeric');

  generateAlphaNumericMock.mockImplementation(() => 'password generated :)');

  beforeEach(() => {
    render(<Home />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Initial render', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Gere sua nova senha agora')).toBeInTheDocument();
    expect(screen.getByText('Gerador de senha moderno e seguro')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de senha:')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantidade de caracteres:')).toBeInTheDocument();
    expect(screen.getByTestId('generate-button')).toBeInTheDocument();
    expect(screen.queryByText('Clique no botão para copiar e cole onde desejar')).not.toBeInTheDocument();
  });

  it('Should render password generated', async() => {
    const user = userEvent.setup();

    await user.selectOptions(screen.getByLabelText('Tipo de senha:'), 'alpha');

    await user.click(screen.getByTestId('generate-button'));

    expect(screen.getByText('password generated :)')).toBeInTheDocument();
    expect(screen.getByText('Clique no botão para copiar e cole onde desejar')).toBeInTheDocument();
  });
});
