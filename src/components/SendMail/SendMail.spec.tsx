import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SendMail from '.';

const propsParams = {
  multiple: true,
  channel: 'channel',
  id: 0,
  title: 'title',
  description: 'description',
  modified: '',
  pageCount: 0,
  issueNumber: 0,
  thumbnail: 'thumbnail',
  image: 'image',
  nameChannel: 'nameChannel',
  name: ['name'],
  active: false,
};

jest.mock('../../context/ProfileContext', () => {
  return {
    useProfile: () => ({
      profile: {
        email: '',
        name: '',
      },
    }),
  };
});

describe('SendMail Component', () => {
  it('They must contain the fields in the sendmail form', async () => {
    render(<SendMail data={propsParams} />);

    const emailField = screen.getByRole('textbox', {
      name: /nome/i,
    });
    fireEvent.change(emailField, { target: { value: 'r@r.com.br' } });

    const nameField = screen.getByRole('textbox', {
      name: /email/i,
    });
    fireEvent.change(nameField, { target: { value: 'rr' } });

    await waitFor(() => {
      expect(emailField).toBeInTheDocument();
      expect(nameField).toBeInTheDocument();
    });
  });
});
