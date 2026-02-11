import { client } from "@/sanity/lib/client";
import {
  BLOG_POSTS_COUNT_QUERY,
  BLOG_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { BlogPostList } from "./BlogPostList";

const POSTS_PER_PAGE = 15;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const totalPages = Math.max(
    1,
    Math.ceil((await client.fetch(BLOG_POSTS_COUNT_QUERY)) / POSTS_PER_PAGE)
  );
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const posts = await client.fetch(BLOG_POSTS_QUERY, { start, end });

  return (
    <BlogPostList
      posts={posts}
      heading="Blog"
      tagline="From Sanity"
      description="Posts from your Sanity CMS."
      currentPage={safePage}
      totalPages={totalPages}
      basePath="/blog"
    />
  );
}
