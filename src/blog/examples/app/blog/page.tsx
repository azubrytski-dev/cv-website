import path from 'node:path';
import { Blog } from '@cv/blog';
import { getBlogPosts } from '@cv/blog/server';

export default async function BlogPage() {
  const posts = await getBlogPosts(path.join(process.cwd(), '../blog/content'));

  return <Blog posts={posts} />;
}
