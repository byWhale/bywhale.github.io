import { site } from '../site.mjs';
import { posts } from '../lib/posts.mjs';

const escape = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function GET(context) {
  const base = String(context.site).replace(/\/$/, '');
  const items = posts
    .map((post) => {
      const link = `${base}${post.url}`;
      return [
        '    <item>',
        `      <title>${escape(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${post.date.toUTCString()}</pubDate>`,
        `      <category>${escape(post.category)}</category>`,
        post.description ? `      <description>${escape(post.description)}</description>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}</title>
    <link>${base}/</link>
    <description>${escape(site.description)}</description>
    <language>zh-CN</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
