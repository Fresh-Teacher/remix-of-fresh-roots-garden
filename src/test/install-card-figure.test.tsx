import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { LibraryShell } from '@/components/library-shell';
import { APP_APK_URL, APP_STORE_URL, PLAY_STORE_URL } from '@/components/navigation/install-card';

const routerMock = vi.hoisted(() => ({ navigate: vi.fn(), history: { back: vi.fn() } }));
const location = vi.hoisted(() => ({ pathname: '/' }));

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => routerMock,
  useRouterState: ({ select }: { select: (state: { status: string }) => unknown }) => select({ status: 'idle' }),
  Link: ({ to, children, ...props }: { to: string; children?: unknown } & Record<string, unknown>) => <a href={to} {...props}>{children as never}</a>,
  useLocation: ({ select }: { select: (value: typeof location) => string }) => select(location),
}));

const pointer = JSON.parse(readFileSync(resolve(process.cwd(), 'src/assets/install-card-mascot.webp.asset.json'), 'utf8')) as {
  url: string; content_type: string; size: number;
};

const openCard = () => {
  render(<LibraryShell>Page content</LibraryShell>);
  fireEvent.click(screen.getByRole('button', { name: 'Install the app' }));
};

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); location.pathname = '/'; window.history.replaceState({}, '', '/'); localStorage.clear(); });

describe('Install card mascot picture', () => {
  it('shows the mascot inside the install card opened from the app bar', () => {
    openCard();
    const figure = screen.getByRole('img', { name: 'Fresh App mascot holding a phone' });
    expect(figure).toBeInTheDocument();
    expect(figure.getAttribute('src')).toBe(pointer.url);
  });

  it('ships the mascot as a lightweight WebP pointer', () => {
    expect(pointer.content_type).toBe('image/webp');
    expect(pointer.size).toBeGreaterThan(0);
    expect(pointer.size).toBeLessThan(40_000);
    expect(pointer.url).toMatch(/^\/__l5e\/assets-v1\//);
  });
});

describe('Install card app download options', () => {
  it('downloads the hosted APK with visual feedback while it fetches', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new Blob(['apk']), { status: 200 }));
    URL.createObjectURL = vi.fn(() => 'blob:apk') as never;
    URL.revokeObjectURL = vi.fn() as never;
    openCard();
    const apk = screen.getByRole('button', { name: /download the fresh app apk/i });
    fireEvent.click(apk);
    expect(apk).toBeDisabled();
    expect(apk.textContent).toMatch(/downloading…/i);
    expect(await screen.findByRole('button', { name: /downloaded/i })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(APP_APK_URL);
  });

  it('offers the direct app file link when the download fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    openCard();
    fireEvent.click(screen.getByRole('button', { name: /download the fresh app apk/i }));
    const alert = await screen.findByRole('alert');
    const fallback = alert.querySelector('a');
    expect(fallback?.getAttribute('href')).toBe(APP_APK_URL);
  });

  it('shows the official Google Play and App Store badges linking out', () => {
    openCard();
    const play = screen.getByRole('link', { name: 'Get the Fresh App on Google Play' });
    const apple = screen.getByRole('link', { name: 'Get the Fresh App on the Apple App Store' });
    expect(play.getAttribute('href')).toBe(PLAY_STORE_URL);
    expect(apple.getAttribute('href')).toBe(APP_STORE_URL);
    expect(play.getAttribute('target')).toBe('_blank');
    expect(apple.getAttribute('target')).toBe('_blank');
    expect(screen.getByRole('img', { name: 'Get it on Google Play' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Download on the App Store' })).toBeInTheDocument();
  });

  it('no longer offers a separate Download Our App entry in the side menu', () => {
    const menu = JSON.parse(readFileSync(resolve(process.cwd(), 'src/data/navigation/menu.json'), 'utf8')) as Array<{ label: string }>;
    expect(menu.some((entry) => /download our app/i.test(entry.label))).toBe(false);
  });
});

describe('Install card library sharing', () => {
  it('shares the library homepage rather than the currently open document', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { platform: navigator.platform, userAgent: navigator.userAgent, share });
    location.pathname = '/doc/example';
    window.history.replaceState({}, '', '/doc/example');
    openCard();
    fireEvent.click(screen.getByRole('button', { name: 'Share the Fresh Teacher’s Library' }));
    expect(share).toHaveBeenCalledWith({
      title: 'Fresh Teacher’s Library',
      text: 'Hello, I have discovered these useful teaching and learning resources from Fresh Teacher’s Library.\n\nFollow this link to check it out:',
      url: `${window.location.origin}/`,
    });
  });

  it('copies the library message and homepage link when native sharing is unavailable', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { platform: navigator.platform, userAgent: navigator.userAgent, clipboard: { writeText } });
    openCard();
    fireEvent.click(screen.getByRole('button', { name: 'Share the Fresh Teacher’s Library' }));
    await screen.findByRole('status');
    expect(writeText).toHaveBeenCalledWith(`Hello, I have discovered these useful teaching and learning resources from Fresh Teacher’s Library.\n\nFollow this link to check it out:\n${window.location.origin}/`);
  });

  it('does not copy anything if the user cancels the share sheet', async () => {
    const writeText = vi.fn();
    const share = vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError'));
    vi.stubGlobal('navigator', { platform: navigator.platform, userAgent: navigator.userAgent, share, clipboard: { writeText } });
    openCard();
    fireEvent.click(screen.getByRole('button', { name: 'Share the Fresh Teacher’s Library' }));
    await share.mock.results[0]?.value.catch(() => undefined);
    expect(writeText).not.toHaveBeenCalled();
  });
});
