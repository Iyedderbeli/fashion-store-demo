# NOVA project instructions

NOVA is a fictional React/Vite streetwear storefront and a practice portfolio project. Its product data and cart live in the browser; it is not the business's flagship client showcase. Preserve the current features and visual direction unless a task explicitly asks to change them. Use `README.md` for setup, the shopping flow, and WhatsApp configuration.

## Delivery workflow

1. **Understand:** Identify the customer's audience, goal, required pages and flows, content, brand inputs, budget, deadline, and definition of done. Resolve material gaps before coding; record assumptions when a detail is minor.
2. **Research:** Check relevant examples, technical constraints, current platform requirements, and asset rights when they affect the work. Keep sources and licenses traceable.
3. **Plan:** State scope, acceptance criteria, and a brief design direction (content hierarchy, typography, color, layout, and mobile behavior). Review major changes against the brief before building.
4. **Implement:** Make focused, maintainable changes using the existing stack and conventions. Use semantic HTML and clear, task-specific copy. Do not add dependencies, services, or paid tools without a concrete need and a cost check.
5. **Test:** Run available checks and manually exercise the changed flows on desktop and mobile. Check keyboard use, focus, contrast, and reduced motion where relevant. Add targeted tests for meaningful logic or regressions, not tests that merely repeat the implementation.
6. **Refine:** Inspect the rendered result, fix broken states and rough edges, and recheck affected flows.
7. **Deploy:** Use the agreed host, verify the live URL and critical path, and hand over the outcome, costs, and any remaining limits.

## Skills and tools

Choose skills and tools based on the current task, not a fixed preferred list. Consider relevant installed skills when they materially improve design, implementation, testing, or delivery. Suggest additional trusted skills when they offer a concrete advantage, but inspect their instructions, scripts, and permissions before adoption. Ask before installing new skills or enabling new external integrations. Avoid redundant or conflicting skills and unnecessary context loading.

## Quality and safety rules

- Build for the customer's real content and goals. Avoid generic layouts, invented testimonials, unsupported claims, and decorative motion that obscures the task.
- Check narrow and wide screens, text enlargement, touch controls, and overflow. Keep navigation and dialogs usable without a mouse; provide visible focus and meaningful labels and image alternatives.
- Keep components and data understandable. Prefer small changes to abstractions made for hypothetical reuse. Handle empty, error, and loading states when the feature needs them.
- Keep secrets and customer data out of source control. Validate untrusted input at the appropriate boundary; do not put sensitive data in browser storage. Keep third-party scripts and permissions to the minimum needed.
- Before delivery, review the diff, run `npm run build`, and follow the relevant manual checks in `README.md` and `QUALITY_CHECKLIST.md`. Report what actually passed, what was not checked, and any known limitations. A recommendation is not a test result.
