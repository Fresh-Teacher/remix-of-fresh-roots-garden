<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Repository import
- Preserve imported TanStack file routes, shared library shell, and static resource catalogs to retain the source app’s navigation and search behavior.
- Rehome imported media through project-owned asset pointers and rewrite references to avoid dependence on another project’s storage.
- Render only active homepage doors and shelves directly; restore session state before paint while keeping SSR's initial render deterministic to avoid legacy tree overhead and return flashes.
- Inline the early-tap bootstrap from stable raw JavaScript rather than Function.toString(); keep its behavior aligned with the tested installer so server/client transforms cannot change hydration text.

## Document search
- Use the shared inline document combobox with the current catalog as its suggestion source; reuse catalog ranking so suggestions and local results stay consistent without loading the global index.

## Class selection hubs
- Load class menus from per-class typed static catalogs and render them directly; keep legacy HTML parsing and legacy stylesheet downloads off the class hub path to avoid hidden-tree overhead.
- Share the class hub layout with its pending placeholder and keep appearance-matched hub CSS scoped; this preserves geometry and prevents styles from affecting document pages.
- Keep resource entrances in scoped CSS with a label-based mapping and clipped, normal-flow reveal containers; this preserves original motion without loading legacy styles or moving neighbouring tap targets during animation.
- Reuse the class-menu keyframes for Share popup entrances and choose a non-repeating random variant on open; this keeps sharing lightweight and preserves the accessible menu and its actions.

- PWA is manifest-only (public/manifest.webmanifest); no offline service worker. public/sw.js is a self-unregistering cleanup worker for browsers that had the old one — do not reintroduce caching.

## Installation popup
- Share and APK actions reuse the same button styling with scoped semantic colour variables so their shape, glow and interaction states remain aligned.
