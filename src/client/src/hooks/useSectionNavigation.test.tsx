import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { SectionLinks } from '../components/SectionNavigation';
import { pageSections } from '../lib/sections';
import { useSectionNavigation } from './useSectionNavigation';

const originals = {
  observer: window.IntersectionObserver,
  scrollTo: window.scrollTo,
  scrollIntoView: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView'),
  scrollY: Object.getOwnPropertyDescriptor(window, 'scrollY'),
  innerHeight: Object.getOwnPropertyDescriptor(window, 'innerHeight'),
  scrollHeight: Object.getOwnPropertyDescriptor(document.documentElement, 'scrollHeight'),
  restoration: Object.getOwnPropertyDescriptor(window.history, 'scrollRestoration'),
};
let scrollY: number;
let viewportHeight: number;
let pageHeight: number;
let headerHeight: number;
let positions: Record<string, number>;
let observers: ObserverMock[];
let scrollIntoView: jest.Mock;
let scrollTo: jest.Mock;

class ObserverMock implements IntersectionObserver {
  root = null;
  rootMargin: string;
  thresholds = [0];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = () => [];
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {
    this.rootMargin = options?.rootMargin ?? '0px';
    observers.push(this);
  }
}

function Harness() {
  const { activeSection, navigateToSection } = useSectionNavigation();
  return (
    <>
      <div className="navbar" />
      <nav aria-label="Page sections"><SectionLinks activeSection={activeSection} onNavigate={navigateToSection} /></nav>
      {pageSections.map(section => (
        <section key={section.id} id={section.id} aria-label={section.label}>
          <h2>{section.label} heading</h2>
        </section>
      ))}
      <footer className="contact-bar" />
    </>
  );
}

function advance(ms: number) { act(() => jest.advanceTimersByTime(ms)); }
function moveTo(y: number) {
  scrollY = y;
  fireEvent.scroll(window);
  advance(16);
}
function expectActive(name: string) {
  expect(screen.getByRole('link', { name })).toHaveAttribute('aria-current', 'location');
  expect(document.querySelectorAll('[aria-current="location"]')).toHaveLength(1);
}
function restore(object: object, property: string, descriptor?: PropertyDescriptor) {
  if (descriptor) Object.defineProperty(object, property, descriptor);
  else Reflect.deleteProperty(object, property);
}

beforeEach(() => {
  jest.useFakeTimers();
  observers = [];
  scrollY = 0;
  viewportHeight = 900;
  pageHeight = 4200;
  headerHeight = 72;
  positions = { overview: 140, experience: 700, skills: 2800, education: 3500 };
  window.history.replaceState({}, '', '/');
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });
  scrollTo = jest.fn((options: ScrollToOptions) => { scrollY = options.top ?? scrollY; });
  scrollIntoView = jest.fn(function (this: HTMLElement, options: ScrollIntoViewOptions) {
    if (options.behavior === 'auto') {
      scrollY = Math.max(0, Math.min(positions[this.id] - 20 - headerHeight - 24, pageHeight - viewportHeight));
    }
  });
  Object.defineProperties(window, {
    IntersectionObserver: { configurable: true, writable: true, value: ObserverMock },
    scrollTo: { configurable: true, writable: true, value: scrollTo },
    scrollY: { configurable: true, get: () => scrollY },
    innerHeight: { configurable: true, get: () => viewportHeight },
  });
  Object.defineProperty(window.history, 'scrollRestoration', { configurable: true, writable: true, value: 'auto' });
  Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, get: () => pageHeight });
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView });
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    let top = 0;
    let height = 32;
    if (this.classList.contains('navbar')) height = headerHeight;
    else if (this.classList.contains('contact-bar')) { top = viewportHeight - 60; height = 60; }
    else {
      const id = this.closest('section')?.id;
      if (id) top = positions[id] - scrollY - (this.tagName === 'SECTION' ? 20 : 0);
    }
    return { top, bottom: top + height, height, left: 0, right: 100, width: 100, x: 0, y: top, toJSON: () => ({}) };
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
  Object.defineProperty(window, 'IntersectionObserver', { configurable: true, writable: true, value: originals.observer });
  window.scrollTo = originals.scrollTo;
  restore(HTMLElement.prototype, 'scrollIntoView', originals.scrollIntoView);
  restore(window, 'scrollY', originals.scrollY);
  restore(window, 'innerHeight', originals.innerHeight);
  restore(document.documentElement, 'scrollHeight', originals.scrollHeight);
  restore(window.history, 'scrollRestoration', originals.restoration);
});

it('starts a fresh hash-free visit at the top, even with a restored old scroll position', () => {
  scrollY = 2700;
  render(<Harness />);
  expect(scrollY).toBe(0);
  expectActive('Overview');
  expect(window.history.scrollRestoration).toBe('manual');
  scrollY = 2700;
  fireEvent(window, new Event('pageshow'));
  expect(scrollY).toBe(0);
  advance(1000);
  expectActive('Overview');
  expect(window.location.hash).toBe('');
});

it('uses heading crossings at 25% of the space between the fixed bars in both directions', () => {
  render(<Harness />);
  // 72px header + 25% of (900 - 72 - 60) = 264px.
  expect(observers[0].rootMargin).toMatch(/^-264px /);
  moveTo(420); // Section starts at 260px, but its heading is still at 280px.
  advance(120);
  expectActive('Overview');
  moveTo(435); // Heading is 1px below the line.
  advance(120);
  expectActive('Overview');
  moveTo(436); // Heading is exactly on the activation line.
  advance(119);
  expectActive('Overview');
  advance(1);
  expectActive('Experience');
  moveTo(2300); // A tall Experience section stays active regardless of visible percentage.
  advance(120);
  expectActive('Experience');
  moveTo(2536);
  advance(120);
  expectActive('Skills');
  moveTo(2535);
  advance(120);
  expectActive('Experience');
});

it('skips transient highlights during fast scrolling down and back up', () => {
  render(<Harness />);
  moveTo(500); advance(70);
  expectActive('Overview');
  moveTo(2600); advance(70);
  expectActive('Overview');
  moveTo(3300); advance(120);
  expectActive('Education');
  moveTo(2600); advance(70);
  expectActive('Education');
  moveTo(500); advance(70);
  expectActive('Education');
  moveTo(0); advance(120);
  expectActive('Overview');
});

it('never changes the URL hash during passive scrolling', () => {
  render(<Harness />);
  const push = jest.spyOn(window.history, 'pushState');
  const replace = jest.spyOn(window.history, 'replaceState');
  moveTo(500); advance(120);
  moveTo(2600); advance(120);
  expectActive('Skills');
  expect(window.location.hash).toBe('');
  expect(push).not.toHaveBeenCalled();
  expect(replace).not.toHaveBeenCalled();
});

it('supports intentional deep links without later rewriting them to the scroll position', () => {
  window.history.replaceState({}, '', '/#education');
  render(<Harness />);
  expectActive('Education');
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  expect(scrollY).toBe(3300);
  advance(500);
  moveTo(500); advance(120);
  expectActive('Experience');
  expect(window.location.hash).toBe('#education');
});

it('selects Education at the page bottom even when its heading cannot reach the line', () => {
  positions.education = 4000;
  render(<Harness />);
  moveTo(3290); advance(120);
  expectActive('Skills');
  moveTo(3300); advance(120);
  expectActive('Education');
  moveTo(3290); advance(120);
  expectActive('Skills');
});

it('locks a clicked destination through intermediate sections and releases it on scrollend', () => {
  render(<Harness />);
  fireEvent.click(screen.getByRole('link', { name: 'Education' }));
  expectActive('Education');
  expect(window.location.hash).toBe('#education');
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  moveTo(500); advance(100);
  expectActive('Education');
  moveTo(2600); advance(100);
  expectActive('Education');
  moveTo(3300);
  fireEvent(window, new Event('scrollend'));
  moveTo(500); advance(120);
  expectActive('Experience');
});

it('ignores a stale scrollend from a canceled animation before the new target is reached', () => {
  render(<Harness />);
  fireEvent.click(screen.getByRole('link', { name: 'Education' }));
  moveTo(500);
  fireEvent(window, new Event('scrollend'));
  advance(120);
  expectActive('Education');
});

it('resumes tracking after scroll inactivity in browsers without scrollend', () => {
  render(<Harness />);
  fireEvent.click(screen.getByRole('link', { name: 'Education' }));
  moveTo(2600);
  advance(100);
  expectActive('Education');
  advance(200);
  expectActive('Skills');
});

it.each(['wheel', 'touchstart', 'pointerdown', 'keydown'])(
  'resumes tracking when the user interrupts smooth scrolling with %s', event => {
    render(<Harness />);
    fireEvent.click(screen.getByRole('link', { name: 'Education' }));
    moveTo(500);
    if (event === 'keydown') fireEvent.keyDown(window, { key: 'PageUp' });
    else fireEvent(window, new Event(event));
    advance(140);
    expectActive('Experience');
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 500, left: 0, behavior: 'auto' });
  },
);

it('honors reduced motion for clicked navigation', () => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: true });
  render(<Harness />);
  fireEvent.click(screen.getByRole('link', { name: 'Skills' }));
  expectActive('Skills');
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  advance(500);
  expectActive('Skills');
});

it('keeps keyboard focus separate from the current section highlight', () => {
  render(<Harness />);
  const education = screen.getByRole('link', { name: 'Education' });
  education.focus();
  moveTo(500); advance(120);
  expectActive('Experience');
  expect(education).toHaveFocus();
  expect(education).not.toHaveAttribute('aria-current');
});

it('recalculates the activation line when the fixed header or viewport changes size', () => {
  render(<Harness />);
  moveTo(420); advance(120);
  expectActive('Overview');
  headerHeight = 200;
  fireEvent.resize(window);
  advance(140);
  expectActive('Experience');
  expect(observers[0].disconnect).toHaveBeenCalled();
});

it('supports history navigation to intentional anchors and back to a hash-free home', () => {
  render(<Harness />);
  window.history.replaceState({}, '', '/#skills');
  fireEvent(window, new PopStateEvent('popstate'));
  expectActive('Skills');
  window.history.replaceState({}, '', '/');
  fireEvent(window, new PopStateEvent('popstate'));
  expectActive('Overview');
  expect(scrollY).toBe(0);
});

it('cleans up pending candidates, observers and the scroll-restoration override', () => {
  const { unmount } = render(<Harness />);
  moveTo(500);
  unmount();
  advance(1000);
  expect(window.history.scrollRestoration).toBe('auto');
  expect(observers[0].disconnect).toHaveBeenCalled();
});
