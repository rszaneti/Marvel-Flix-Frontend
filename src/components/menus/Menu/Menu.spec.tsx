import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '.';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Menu Component', () => {
  it('List menus correctly', () => {
    render(<Menu />);

    expect(screen.getByText('Histórias em Quadrinhos')).toBeInTheDocument();
    expect(screen.getByText('Personagens')).toBeInTheDocument();
  });

  it('Should be able to menu click', () => {
    render(<Menu />);

    const liElement = screen.getByText('Histórias em Quadrinhos');

    fireEvent.click(liElement);

    expect(liElement).toBeTruthy();
  });
});
