/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';

// Bump when replacing favicon assets so browsers and SW caches refetch.
const FAV = '?v=mg2026';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="apple-touch-icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href={`/apple-touch-icon.png${FAV}`}
    />,
    <link
      key="icon32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={`/favicon-32x32.png${FAV}`}
    />,
    <link
      key="icon16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={`/favicon-16x16.png${FAV}`}
    />,
    <link key="icon-ico" rel="icon" href={`/favicon.ico${FAV}`} />,
    <meta key="msapplication-TileColor" name="msapplication-TileColor" content="#0a192f" />,
    <meta key="theme-color" name="theme-color" content="#64ffda" />,
    <script
      key="gtag"
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-KBJ3HD59L2"
    />,
    <script
      key="gtag-init"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KBJ3HD59L2');
        `,
      }}
    />,
  ]);
};
