import fs from 'node:fs/promises';
import path from 'node:path';

import type { BlogPost, BlogPostStatus } from '../models/Post';

const CATEGORY_ORDER = ['backend', 'frontend', 'databases', 'cloud', 'ai'];

function splitFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: '', body: source.trim() };
  }

  return {
    frontmatter: match[1].trim(),
    body: match[2].trim(),
  };
}

function parseFrontmatter(frontmatter: string) {
  return frontmatter.split('\n').reduce<Record<string, string>>((acc, line) => {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    acc[key] = value;
    return acc;
  }, {});
}

function parseTags(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

async function collectMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(absolutePath);
    }
  }

  return files;
}

export async function getBlogPosts(contentDirectory: string): Promise<BlogPost[]> {
  try {
    await fs.access(contentDirectory);
  } catch {
    return [];
  }

  const files = await collectMarkdownFiles(contentDirectory);
  const posts = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf8');
      const { frontmatter, body } = splitFrontmatter(raw);
      const meta = parseFrontmatter(frontmatter);
      const fileName = path.basename(filePath, '.md');

      return {
        slug: meta.slug ?? fileName,
        topic: meta.topic ?? meta.title ?? fileName,
        tags: parseTags(meta.tags),
        content: body,
        title: meta.title ?? meta.topic ?? fileName,
        categoryKey: meta.categoryKey ?? 'uncategorized',
        category: meta.category ?? 'Uncategorized',
        skill: meta.skill ?? 'General',
        status: (meta.status === 'published' ? 'published' : 'planned') as BlogPostStatus,
        summary: meta.summary ?? body.split('\n').find((line) => line.trim()) ?? '',
        filePath,
      };
    }),
  );

  return posts.sort((left, right) => {
    const categoryDelta =
      CATEGORY_ORDER.indexOf(left.categoryKey) - CATEGORY_ORDER.indexOf(right.categoryKey);

    if (categoryDelta !== 0) {
      return categoryDelta;
    }

    if (left.status !== right.status) {
      return left.status === 'published' ? -1 : 1;
    }

    return left.title.localeCompare(right.title);
  });
}

export async function getBlogPostBySlug(slug: string, contentDirectory: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts(contentDirectory);
  return posts.find((post) => post.slug === slug) ?? null;
}

export function groupBlogPosts(posts: BlogPost[]) {
  return posts.reduce<Record<string, BlogPost[]>>((acc, post) => {
    const key = post.categoryKey;
    acc[key] = acc[key] ?? [];
    acc[key].push(post);
    return acc;
  }, {});
}
