import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '.';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Header Component', () => {
  it('Should be able to header', () => {
    render(<Header />);

    expect(screen.getByTestId('header-menu')).toBeInTheDocument();
    expect(screen.getByTestId('header-side-list')).toBeInTheDocument();
  });
});
