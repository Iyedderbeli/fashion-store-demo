# Client website acceptance checklist

Use this checklist with the agreed brief; mark items that do not apply. NOVA is a practice demo, so this is a standard for future client delivery, not a claim that every item has been verified here.

## Brief and content

- [ ] Audience, business goal, primary action, required pages, and success criteria are agreed.
- [ ] The client has approved final copy, prices, contact details, legal text, and required assets; no placeholder or invented claims remain.
- [ ] Navigation, calls to action, and page hierarchy make the primary task easy to find and complete.

## Design and responsive behavior

- [ ] Typography, color, spacing, imagery, and interaction states follow a brief-specific visual direction consistently.
- [ ] Images are optimized, properly cropped, and licensed or supplied for the intended use.
- [ ] Compare key pages at desktop and mobile widths against approved visual references or screenshots; fix unintended differences and record agreed deviations.
- [ ] Key pages and flows are checked at phone, tablet, and desktop widths, including a narrow phone; there is no unintended horizontal scrolling, overlap, or clipped content.
- [ ] Text remains readable and controls remain usable at 200% browser zoom.
- [ ] Primary touch controls have comfortable targets and spacing; nothing essential depends on hover.

## Accessibility and interaction

- [ ] Headings, landmarks, links, buttons, and form controls use appropriate semantics and accessible names.
- [ ] A keyboard user can complete each critical flow in a logical order, see focus, and leave dialogs or menus without a trap.
- [ ] Meaningful images have useful alternatives; decorative images are ignored by assistive technology.
- [ ] Text and control states have sufficient contrast; color alone does not carry essential meaning.
- [ ] Motion respects reduced-motion preferences; content does not flash or move unnecessarily.
- [ ] Forms, if present, have labels, clear validation errors, and a visible success or failure result.

## Function, security, and performance

- [ ] Each agreed critical flow works end to end; empty, error, and loading states are checked where applicable.
- [ ] For critical flows that are repeated or prone to regression, use available automated tests (such as browser interaction tests) when practical; record results and keep manual checks for what automation does not cover.
- [ ] Links, images, menus, and integrations work; there are no unexplained browser console errors.
- [ ] Secrets are absent from the repository and client-side bundle; sensitive data is handled only where needed and with appropriate protection.
- [ ] Third-party scripts, dependencies, cookies, and paid services have a clear purpose and known cost.
- [ ] Pages load acceptably on a mobile connection; large images, fonts, scripts, and layout shifts have been reviewed.
- [ ] Page titles, descriptions, and search visibility settings match the client's publishing goals.

## Release and handoff

- [ ] The production build passes and the deployed site is smoke-tested on its real URL.
- [ ] The client knows the host, domain owner, recurring costs, update process, and who holds account access.
- [ ] Handoff lists delivered features, checks actually performed, known limitations, and follow-up work.
