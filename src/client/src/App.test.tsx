import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => {
  const React = require('react');

  return {
    Route: () => null,
    Routes: ({ children }: { children: React.ReactNode }) => {
      const pathname = global.location.pathname;
      const route = React.Children.toArray(children).find((child: any) => {
        if (!React.isValidElement(child)) {
          return false;
        }

        if (child.props.path === '/') {
          return pathname === '/';
        }

        return child.props.path === pathname;
      });

      return <>{route ? route.props.element : null}</>;
    },
    NavLink: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
}, { virtual: true });

jest.mock('./components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">navbar</div>;
  };
});

jest.mock('./views/AboutMe', () => {
  return function MockAboutMe() {
    return <div>about-me-page</div>;
  };
});

jest.mock('./views/Beats', () => {
  return function MockBeats() {
    return <div>beats-page</div>;
  };
});

describe('App routing', () => {
  it('renders the about page on the home route', () => {
    window.history.pushState({}, '', '/');

    render(
      <App />
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByText('about-me-page')).toBeInTheDocument();
  });

  it('renders the beats page on the beats route', () => {
    window.history.pushState({}, '', '/beats');

    render(<App />);

    expect(screen.getByText('beats-page')).toBeInTheDocument();
  });
});
