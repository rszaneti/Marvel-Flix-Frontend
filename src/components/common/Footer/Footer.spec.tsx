/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Modal, Backdrop } from '@material-ui/core';
import { CssModalStyles } from '../../../styles/globalMaterialUi';
import SendMail from '../../SendMail';
import Footer from '.';

jest.mock('react-router-dom', () => {
  return {
    useParams: () => ({
      channel: 'comics',
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('.../../../context/SendMailContext', () => {
  return {
    useSendMail: () => ({
      funcOpenModal: jest.fn(),
      funcCloseModal: jest.fn(),
    }),
  };
});

jest.mock('@material-ui/lab', () => {
  return {
    Pagination: jest.fn(),
  };
});

describe('Footer Component', () => {
  it('Should be able to open modal click', () => {
    render(<Footer />);

    const element = screen.getByText('Enviar E-mail dos itens selecionados');

    fireEvent.click(element);

    expect(element).toBeTruthy();
  });
});
