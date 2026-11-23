# NOVA storefront

A fictional streetwear storefront built with React, Vite and plain CSS. The catalog and cart run locally in the browser.

## Run locally

From this folder, using Node.js 22 LTS or newer:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To build and inspect the production output:

```sh
npm run build
npm run preview
```

## Review the shopping flow

1. Open the collection. Check that All pieces shows six items and that Tops, Bottoms, Outerwear and Accessories show 2, 2, 1 and 1 respectively.
2. Open the Studio Hoodie. Confirm Add to bag becomes available after choosing a size. Add two different sizes and check that the bag shows separate lines.
3. Increase and decrease a quantity, then reload and reopen the bag. Check the quantities and total, then remove the items to see the empty state.
4. With an item in the bag, expand Preview order message and check its quantities, sizes and total. The WhatsApp order button is disabled by default.
5. Try the storefront at desktop and phone widths. Use Tab and Shift+Tab to navigate, arrow keys to change a selected size, and Escape to dismiss a dialog. Turn on reduced motion in your operating system or browser developer tools and repeat.

## WhatsApp configuration

Copy `.env.example` to `.env.local` and supply an approved business number under `VITE_WHATSAPP_NUMBER`. Use international digits including the country code, without a plus sign, spaces, or punctuation. Restart Vite after editing the file, and rebuild for production. The contact number will be visible to storefront visitors when configured.

## Images

The built-in image generator created the original campaign and catalog imagery for this demo. The WebP files are in `public/images/`.

- Hero prompt direction — A monochrome streetwear editorial with a model in an oversized faded black hoodie and charcoal cargo pants seated on concrete, with dark negative space on the left for copy.
- Catalog prompt direction — A 3 × 2 studio contact sheet of a washed charcoal hoodie, bone tee, olive cargo, black bomber, slate sweatpant and charcoal cap. Each garment is isolated on cool gray and cropped into its own product image.
