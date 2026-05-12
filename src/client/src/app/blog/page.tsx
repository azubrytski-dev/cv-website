import Blog from '../../views/Blog';
import { getBlogPosts } from '../../lib/blog';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <Blog posts={posts} />;
}
