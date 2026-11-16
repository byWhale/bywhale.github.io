// 读取 src/content/posts/ 下的所有 Markdown 文章，按日期从新到旧排序。
const modules = import.meta.glob('../content/posts/*.md', { eager: true });

export const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const fm = mod.frontmatter ?? {};
    return {
      slug,
      url: `/posts/${slug}/`,
      title: fm.title ?? slug,
      subtitle: fm.subtitle ?? '',
      description: fm.description ?? '',
      date: new Date(fm.date),
      category: fm.category ?? '随笔',
      tags: fm.tags ?? [],
      lang: fm.lang ?? 'zh',
      draft: Boolean(fm.draft),
      Content: mod.Content,
    };
  })
  .filter((post) => !(import.meta.env.PROD && post.draft))
  .sort((a, b) => b.date - a.date);

const pad = (n) => String(n).padStart(2, '0');

// 2026-11-16
export const ymd = (d) =>
  `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;

// 11-16
export const monthDay = (d) => `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;

// 2026 年 11 月 16 日
export const cnDate = (d) =>
  `${d.getUTCFullYear()} 年 ${d.getUTCMonth() + 1} 月 ${d.getUTCDate()} 日`;

// [{ year: 2026, posts: [...] }, ...]
export const postsByYear = () => {
  const groups = new Map();
  for (const post of posts) {
    const year = post.date.getUTCFullYear();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(post);
  }
  return [...groups.entries()].map(([year, items]) => ({ year, posts: items }));
};

// [{ tag: '写作', posts: [...] }, ...]，文章多的标签在前
export const postsByTag = () => {
  const groups = new Map();
  for (const post of posts) {
    for (const tag of post.tags) {
      if (!groups.has(tag)) groups.set(tag, []);
      groups.get(tag).push(post);
    }
  }
  return [...groups.entries()]
    .map(([tag, items]) => ({ tag, posts: items }))
    .sort((a, b) => b.posts.length - a.posts.length || a.tag.localeCompare(b.tag));
};

// 标题是不是以中文为主（决定用楷体还是衬线体）
export const isCJK = (text) => /[一-鿿]/.test(text);
