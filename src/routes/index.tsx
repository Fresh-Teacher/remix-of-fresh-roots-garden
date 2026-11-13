import { useEffect, useLayoutEffect, useRef, useState, type SyntheticEvent, type TouchEvent } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { homepageShelves, homepageClassNames } from '@/data/homepage-shelves';
import repairCSS from '../styles/import-repairs.css?raw';
import capturedCssUrl from '../styles/captured.css?url';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Fresh Teacher's Library" },
    { name: "description", content: "Fresh Teacher's e-library of lesson notes, past papers and schemes of work for Ugandan schools." },
    { property: "og:title", content: "Fresh Teacher's Library" },
    { property: "og:description", content: "Explore nursery, primary and secondary school learning resources from Fresh Teacher." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "stylesheet", href: capturedCssUrl }] }),
  component: Index,
});

export function Index() {
  const [doorOpen, setDoorOpen] = useState(false);
  const [doorSettled, setDoorSettled] = useState(false);
  const opened = useRef(false);
  const audio = useRef<HTMLAudioElement>(null);
  // Match SSR on the first render, then restore before the browser paints client navigation.
  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem('library-door-open') === '1') {
        opened.current = true;
        setDoorOpen(true);
        setDoorSettled(true);
      }
    } catch { /* Storage may be unavailable. */ }
    document.documentElement.dataset['freshReady'] = 'true';
  }, []);
  useEffect(() => {
    if (!doorOpen || doorSettled) return;
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2000;
    const timer = window.setTimeout(() => setDoorSettled(true), delay);
    return () => window.clearTimeout(timer);
  }, [doorOpen, doorSettled]);
  const openDoor = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (opened.current) return;
    opened.current = true;
    setDoorOpen(true);
    try { sessionStorage.setItem('library-door-open', '1'); } catch { /* Storage unavailable. */ }
    audio.current?.removeAttribute('data-early-played');
    void audio.current?.play().catch(() => {});
  };
  const absorbTouch = (event: TouchEvent<HTMLElement>) => event.stopPropagation();
  const doorState = `${doorOpen ? ' door-open' : ''}${doorSettled ? ' door-settled' : ''}`;
  const doorProps = {
    variant: 'source' as const, size: 'source' as const,
    'aria-label': 'Open library', tabIndex: doorOpen ? -1 : 0,
    'aria-hidden': doorSettled,
    onClick: openDoor, onTouchStart: absorbTouch, onTouchMove: absorbTouch, onTouchEnd: openDoor,
  };
  return <div className="library-homepage">
    <style>{repairCSS}</style>
    <Button {...doorProps} className={`leftcurtain${doorState}`}>
      <img src="/__l5e/assets-v1/2a2b1d2d-a21d-40f6-87c2-2d01a495e24a/7c2eea45ca9862de.webp" alt="" fetchPriority="high" decoding="async" />
    </Button>
    <Button {...doorProps} className={`rightcurtain${doorState}`}>
      <img src="/__l5e/assets-v1/e8c9f316-33b2-4327-b379-3272f8643eec/d52f1d3e4b7ea8ab.webp" alt="" fetchPriority="high" decoding="async" />
    </Button>
    <Button {...doorProps} className={`rope${doorState}`}>
      <b className="door-instruction">Tap on the door to enter</b>
      <img className="door-arrow" src="/__l5e/assets-v1/f41481ff-58de-403b-abe6-69e1015a4693/243d7d09dd033233.webp" alt="" width="70" fetchPriority="high" decoding="async" />
    </Button>
    <div className="container">
      <p className="homepage-instruction">Choose one class from the shelf to continue.</p>
      <div className="page-wrapper" inert={!doorOpen} suppressHydrationWarning>
        {homepageShelves.map((shelf, shelfIndex) => <span className="shelf-row" key={shelfIndex}>
          <div className="bookshelf">
            <div className="covers">
              {shelf.map(([href, src]) => <div className="thumb book-1" key={href}>
                <a href={href} aria-label={`Open ${homepageClassNames[href ?? '']} resources`}>
                  <img src={src} alt={homepageClassNames[href ?? '']} width="1654" height="2339" loading="lazy" decoding="async" />
                </a>
              </div>)}
            </div>
            <img className="shelf-img" src="/__l5e/assets-v1/46c87b90-aaee-431a-b201-f1222604e4ed/36bc42cbc31e7907.webp" alt="" width="1000" height="96" decoding="async" />
          </div>
        </span>)}
      </div>
      <audio ref={audio} id="audiocracker" src="/__l5e/assets-v1/5f444360-d34e-4b62-b473-749d852d6f6f/door.mp3" preload="auto" suppressHydrationWarning />
    </div>
  </div>;
}
