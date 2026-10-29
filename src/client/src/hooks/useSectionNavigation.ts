'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { pageSections } from '../lib/sections';
import type { SectionId } from '../lib/sections';

const STABILIZE_MS = 120;
const SCROLL_IDLE_MS = 160;
const isSectionId = (id: string): id is SectionId => pageSections.some(section => section.id === id);

export function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const navigate = useRef<((id: SectionId) => void) | null>(null);

  useEffect(() => {
    const sections = pageSections.flatMap(section => {
      const element = document.getElementById(section.id);
      return element ? [{ ...section, element, heading: element.querySelector('h1, h2') ?? element }] : [];
    });
    if (!sections.length) return;

    let active: SectionId = 'overview';
    let candidate: SectionId | null = null;
    let candidateTimer: ReturnType<typeof setTimeout> | undefined;
    let scrollIdleTimer: ReturnType<typeof setTimeout> | undefined;
    let frame: number | undefined;
    let lockedDestination: SectionId | null = null;
    let observer: IntersectionObserver | undefined;
    let interacted = false;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    function commit(id: SectionId) {
      active = id;
      setActiveSection(id);
    }
    function clearCandidate() {
      clearTimeout(candidateTimer);
      candidateTimer = undefined;
      candidate = null;
    }
    function activationLine() {
      const header = document.querySelector('.navbar')?.getBoundingClientRect();
      const headerBottom = header ? header.bottom : 0;
      const footerHeight = document.querySelector('.contact-bar')?.getBoundingClientRect().height ?? 0;
      const usable = Math.max(0, window.innerHeight - headerBottom - footerHeight);
      return Math.min(window.innerHeight - 1, Math.max(0, Math.round(headerBottom + usable * 0.25)));
    }
    function documentHeight() {
      return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    }
    function currentSection(): SectionId {
      if (window.scrollY <= 1) return 'overview';
      if (window.scrollY + window.innerHeight >= documentHeight() - 2) return sections[sections.length - 1].id;
      const line = activationLine();
      let current: SectionId = 'overview';
      for (const section of sections) {
        if (section.heading.getBoundingClientRect().top <= line) current = section.id;
      }
      return current;
    }
    function sample() {
      frame = undefined;
      if (lockedDestination) return;
      const next = currentSection();
      if (next === active) {
        clearCandidate();
      } else if (next !== candidate) {
        clearCandidate();
        candidate = next;
        candidateTimer = setTimeout(() => {
          candidateTimer = undefined;
          candidate = null;
          if (!lockedDestination && currentSection() === next) commit(next);
          else queueSample();
        }, STABILIZE_MS);
      }
    }
    function queueSample() {
      if (frame === undefined) frame = window.requestAnimationFrame(sample);
    }
    function finishNavigation() {
      clearTimeout(scrollIdleTimer);
      lockedDestination = null;
      queueSample();
    }
    function waitForScrollIdle() {
      clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(finishNavigation, SCROLL_IDLE_MS);
    }
    function onScroll() {
      if (lockedDestination) waitForScrollIdle();
      queueSample();
    }
    function destinationTop(id: SectionId) {
      const element = document.getElementById(id)!;
      const cssOffset = parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop);
      const offset = Number.isFinite(cssOffset) ? cssOffset
        : (document.querySelector('.navbar')?.getBoundingClientRect().bottom ?? 0) + 24;
      return Math.max(0, Math.min(element.getBoundingClientRect().top + window.scrollY - offset, documentHeight() - window.innerHeight));
    }
    function onScrollEnd() {
      // A canceled animation may dispatch a late scrollend after another click.
      if (!lockedDestination || Math.abs(window.scrollY - destinationTop(lockedDestination)) <= 3) finishNavigation();
    }
    function startNavigation(id: SectionId, behavior: ScrollBehavior) {
      clearCandidate();
      clearTimeout(scrollIdleTimer);
      lockedDestination = id;
      commit(id);
      document.getElementById(id)!.scrollIntoView({ behavior, block: 'start' });
      // Fallback for browsers without scrollend, including an already-aligned target.
      waitForScrollIdle();
    }
    function interruptNavigation() {
      interacted = true;
      if (!lockedDestination) return;
      finishNavigation();
      window.scrollTo({ top: window.scrollY, left: window.scrollX, behavior: 'auto' });
    }
    function onKeyDown(event: KeyboardEvent) {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)
        && !(event.target instanceof HTMLElement && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)))) {
        interruptNavigation();
      }
    }
    function positionFromLocation() {
      const hash = window.location.hash.slice(1);
      if (isSectionId(hash) && sections.some(section => section.id === hash)) {
        startNavigation(hash, 'auto');
      } else if (!window.location.hash) {
        clearCandidate();
        clearTimeout(scrollIdleTimer);
        lockedDestination = null;
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        commit('overview');
      }
    }
    function onPageShow() {
      if (!interacted) positionFromLocation();
    }
    function observeHeadings() {
      observer?.disconnect();
      if (typeof IntersectionObserver !== 'undefined') {
        const top = activationLine();
        const bottom = Math.max(0, window.innerHeight - top - 1);
        observer = new IntersectionObserver(queueSample, {
          rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0,
        });
        sections.forEach(section => observer!.observe(section.heading));
      }
      queueSample();
    }

    navigate.current = id => {
      interacted = true;
      if (window.location.hash !== `#${id}`) window.history.pushState(window.history.state, '', `#${id}`);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      startNavigation(id, reducedMotion ? 'auto' : 'smooth');
    };
    positionFromLocation();
    observeHeadings();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', observeHeadings);
    window.addEventListener('scrollend', onScrollEnd);
    document.addEventListener('scrollend', onScrollEnd);
    window.addEventListener('wheel', interruptNavigation, { passive: true });
    window.addEventListener('touchstart', interruptNavigation, { passive: true });
    window.addEventListener('pointerdown', interruptNavigation, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('popstate', positionFromLocation);
    window.addEventListener('hashchange', positionFromLocation);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      navigate.current = null;
      clearCandidate();
      clearTimeout(scrollIdleTimer);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.history.scrollRestoration = previousRestoration;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', observeHeadings);
      window.removeEventListener('scrollend', onScrollEnd);
      document.removeEventListener('scrollend', onScrollEnd);
      window.removeEventListener('wheel', interruptNavigation);
      window.removeEventListener('touchstart', interruptNavigation);
      window.removeEventListener('pointerdown', interruptNavigation);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('popstate', positionFromLocation);
      window.removeEventListener('hashchange', positionFromLocation);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  const navigateToSection = useCallback((event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || !navigate.current || !document.getElementById(id)) return;
    event.preventDefault();
    navigate.current(id);
  }, []);

  return { activeSection, navigateToSection };
}
