import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideList from '.';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Side List Component', () => {
  it('List menus correctly', () => {
    render(<SideList />);

    expect(screen.getByText('Histórias em Quadrinhos')).toBeInTheDocument();
    expect(screen.getByText('Personagens')).toBeInTheDocument();
  });

  it('Should be able to menu click', () => {
    render(<SideList />);

    const element = screen.getByText('Histórias em Quadrinhos');

    fireEvent.click(element);

    expect(element).toBeTruthy();
  });

  it('Should be able to open menu click', () => {
    render(<SideList />);

    const element = screen.getByTitle('ABRIR MENU');

    fireEvent.click(element);

    expect(element).toBeTruthy();
  });

  it('Should be able to close menu click', () => {
    render(<SideList />);

    const element = screen.getByTitle('RECOLHER MENU');

    fireEvent.click(element);

    expect(element).toBeTruthy();
  });
});
