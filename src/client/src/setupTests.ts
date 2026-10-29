import '@testing-library/jest-dom';

// jsdom does not implement viewport scrolling.
if (typeof window !== 'undefined') window.scrollTo = jest.fn();
