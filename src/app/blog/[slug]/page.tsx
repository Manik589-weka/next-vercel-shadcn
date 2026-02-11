import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";

const PLACEHOLDER_IMAGE = "https://ui.shadcn.com/placeholder.svg";

/** Force dynamic rendering so build does not run this page (avoids "Failed to collect page data") */
export const dynamic = "force-dynamic";

/** No static paths — all blog posts are rendered on demand */
export async function generateStaticParams() {
  return [];
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  let post: {
    title?: string;
    publishedAt?: string;
    excerptText?: string | null;
    body?: unknown;
    featuredImage?: { asset?: { url?: string } | null; alt?: string | null };
    author?: { name?: string };
    authorName?: string | null;
  } | null = null;
  try {
    post = await client.fetch(BLOG_POST_QUERY, { slug });
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const imageUrl =
    post.featuredImage?.asset?.url ?? PLACEHOLDER_IMAGE;
  const imageAlt = post.featuredImage?.alt ?? post.title ?? "Post image";

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm underline"
      >
        ← Back to Blog
      </Link>

      <header className="mb-8">
        {post.publishedAt && (
          <p className="text-muted-foreground text-sm">
            {formatDate(post.publishedAt)}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          {post.title ?? "Untitled"}
        </h1>
        {(post.author?.name ?? post.authorName) && (
          <p className="text-muted-foreground mt-2 text-sm">
            By {post.author?.name ?? post.authorName}
          </p>
        )}
      </header>

      {post.featuredImage?.asset?.url && (
        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      )}

      {post.excerptText && (
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
          {post.excerptText}
        </p>
      )}

      {Array.isArray(post.body) && post.body.length > 0 && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <PortableText
            value={post.body as import("@portabletext/types").PortableTextBlock[]}
            components={{
              block: {
                h2: ({ children }) => (
                  <h2 className="mt-10 border-b pb-2 text-2xl font-semibold">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-8 text-xl font-semibold">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="mt-6 text-lg font-semibold">{children}</h4>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-muted-foreground/30 my-4 border-l-4 pl-4 italic">
                    {children}
                  </blockquote>
                ),
              },
            }}
          />
        </div>
      )}
    </article>
  );
}
