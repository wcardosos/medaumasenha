import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../../src/components/Form';
import '@testing-library/jest-dom/extend-expect';

describe('Component: Form', () => {
  const onSubmitSpy = jest.fn();

  beforeEach(() => {
    render(<Form onSubmit={onSubmitSpy} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('General tests', () => {
    it('Should render the error message when a password type is not selected', async() => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('generate-button'));

      expect(screen.getByText('É necessário escolher um tipo de senha!'));
      expect(onSubmitSpy).not.toHaveBeenCalled();
    });
  });

  describe('Alphanumeric flow specific tests', () => {
    it('Should render the error message when characters quantity is less than 6', async() => {
      const user = userEvent.setup();

      await user.selectOptions(screen.getByLabelText('Tipo de senha:'), 'alpha');
      await user.type(screen.getByLabelText('Quantidade de caracteres:'), '5');

      await user.click(screen.getByTestId('generate-button'));

      expect(screen.getByText('Valor mínimo: 6 caracteres'));
      expect(onSubmitSpy).not.toHaveBeenCalled();
    });

    it('Should render the error message when characters quantity is more than 36', async() => {
      const user = userEvent.setup();

      await user.selectOptions(screen.getByLabelText('Tipo de senha:'), 'alpha');
      await user.type(screen.getByLabelText('Quantidade de caracteres:'), '37');

      await user.click(screen.getByTestId('generate-button'));

      expect(screen.getByText('Valor máximo: 36 caracteres'));
      expect(onSubmitSpy).not.toHaveBeenCalled();
    });

    it('Should generate a alphanumeric password', async() => {
      const user = userEvent.setup();

      await user.selectOptions(screen.getByLabelText('Tipo de senha:'), 'alpha');

      await user.click(screen.getByTestId('generate-button'));

      expect(onSubmitSpy).toHaveBeenCalledWith('alpha', null);
    });
  });

  describe('Numeric flow specific tests', () => {
    it('Should render the error message when characters quantity is less than 6', async() => {
      const user = userEvent.setup();

      await user.selectOptions(screen.getByLabelText('Tipo de senha:'), 'numeric');
      await user.type(screen.getByLabelText('Quantidade de caracteres:'), '5');

      await user.click(screen.getByTestId('generate-button'));

      expect(screen.getByText('Valor mínimo: 6 caracteres'));
      expect(onSubmitSpy).not.toHaveBeenCalled();
    });

    it('Should render the error message when characters quantity is more than 16', async() => {
      const user = userEvent.setup();

      await user.selectOptions(screen.getByLabelText('Tipo de senha:'), 'numeric');
      await user.type(screen.getByLabelText('Quantidade de caracteres:'), '17');

      await user.click(screen.getByTestId('generate-button'));

      expect(screen.getByText('Valor máximo: 16 caracteres'));
      expect(onSubmitSpy).not.toHaveBeenCalled();
    });

    it('Should generate a alphanumeric password', async() => {
      const user = userEvent.setup();

      await user.selectOptions(screen.getByLabelText('Tipo de senha:'), 'numeric');

      await user.click(screen.getByTestId('generate-button'));

      expect(onSubmitSpy).toHaveBeenCalledWith('numeric', null);
    });
  });
});
