import path from 'node:path';
import { notFound } from 'next/navigation';

import { BlogArticle } from '@cv/blog';
import { getBlogPostBySlug, getBlogPosts } from '@cv/blog/server';

export async function generateStaticParams() {
  const posts = await getBlogPosts(path.join(process.cwd(), '../blog/content'));

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, path.join(process.cwd(), '../blog/content'));

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}

