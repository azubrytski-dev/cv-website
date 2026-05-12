import { notFound } from 'next/navigation';

import BlogArticle from '../../../views/BlogArticle';
import { getBlogPostBySlug, getBlogPosts } from '../../../lib/blog';

export async function generateStaticParams() {
  const posts = await getBlogPosts();

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
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}

