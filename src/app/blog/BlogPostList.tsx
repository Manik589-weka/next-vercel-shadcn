import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const PLACEHOLDER_IMAGE = "https://ui.shadcn.com/placeholder.svg";

export type SanityBlogPostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerptText: string | null;
  publishedAt: string;
  featuredImage: {
    asset: { _id: string; url: string } | null;
    alt: string | null;
  } | null;
  authorName: string | null;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function BlogPostList({
  posts,
  heading = "Blog",
  tagline = "From Sanity",
  description,
  currentPage = 1,
  totalPages = 1,
  basePath = "/blog",
}: {
  posts: SanityBlogPostListItem[];
  heading?: string;
  tagline?: string;
  description?: string;
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
}) {
  const hasPagination = totalPages > 1;
  const prevHref =
    currentPage > 1
      ? currentPage === 2
        ? basePath
        : `${basePath}?page=${currentPage - 1}`
      : null;
  const nextHref =
    currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : null;

  return (
    <section
      className="section-padding-y"
      aria-labelledby="blog-section-heading"
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-col items-start gap-10 md:gap-12">
          <div className="section-title-gap-lg flex flex-col">
            <Tagline>{tagline}</Tagline>
            <h1 id="blog-section-heading" className="heading-lg">
              {heading}
            </h1>
            {description && (
              <p className="text-muted-foreground text-lg/8 text-pretty">
                {description}
              </p>
            )}
          </div>

          {posts.length === 0 ? (
            <p className="text-muted-foreground">
              No blog posts yet. Add content in Sanity Studio.
            </p>
          ) : (
            <div className="flex w-full flex-col gap-10 md:gap-8" role="list">
              {posts.map((post) => {
                const imageUrl =
                  post.featuredImage?.asset?.url ?? PLACEHOLDER_IMAGE;
                const imageAlt =
                  post.featuredImage?.alt ?? `${post.title} thumbnail`;
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex cursor-pointer flex-col gap-6 p-0 md:flex-row"
                    role="listitem"
                  >
                    <div className="w-full md:w-[200px]">
                      <AspectRatio
                        ratio={1 / 1}
                        className="overflow-hidden rounded-xl"
                      >
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 200px "
                        />
                      </AspectRatio>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-0">
                      <div className="flex flex-col gap-3">
                        <p className="text-muted-foreground text-sm">
                          {formatDate(post.publishedAt)}
                        </p>

                        <h2 className="font-semibold tracking-tight group-hover:underline">
                          {post.title}
                        </h2>

                        {post.excerptText && (
                          <p className="text-muted-foreground line-clamp-2 text-sm">
                            {post.excerptText}
                          </p>
                        )}
                      </div>

                      {post.authorName && (
                        <div className="mt-6 flex items-center gap-4 md:mt-0">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src=""
                              alt={post.authorName}
                            />
                          </Avatar>
                          <p className="text-foreground text-sm font-medium">
                            {post.authorName}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {hasPagination && (
            <nav
              className="flex w-full items-center justify-between gap-4 border-t pt-8"
              aria-label="Blog pagination"
            >
              <div>
                {prevHref ? (
                  <Button asChild variant="outline" size="sm">
                    <Link href={prevHref} className="gap-1">
                      <ChevronLeftIcon className="size-4" />
                      Previous
                    </Link>
                  </Button>
                ) : (
                  <span />
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <div>
                {nextHref ? (
                  <Button asChild variant="outline" size="sm">
                    <Link href={nextHref} className="gap-1">
                      Next
                      <ChevronRightIcon className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <span />
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
