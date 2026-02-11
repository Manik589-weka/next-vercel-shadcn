import { defineQuery } from "next-sanity";

/** Total count of blog posts (for pagination) */
export const BLOG_POSTS_COUNT_QUERY = defineQuery(
  /* groq */ `count(*[_type == "blogPost" && defined(slug.current)])`
);

/** Blog posts from Sanity (blogPost type) – for /blog list, paginated */
export const BLOG_POSTS_QUERY = defineQuery(
  /* groq */ `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)[$start...$end]{
    _id,
    title,
    "slug": slug.current,
    "excerptText": pt::text(excerpt),
    publishedAt,
    featuredImage{
      asset->{ _id, url },
      alt
    },
    "authorName": author->name
  }`
);

/** Single blog post by slug */
export const BLOG_POST_QUERY = defineQuery(
  /* groq */ `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "excerptText": pt::text(excerpt),
    body,
    publishedAt,
    featuredImage{
      asset->{ _id, url },
      alt,
      caption
    },
    author->{ name, "image": image.asset->url },
    categories[]->{ title, "slug": slug.current },
    tags[]->{ title }
  }`
);

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_createdAt desc)[0...20]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    _createdAt
  }`
);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    _createdAt
  }`
);

export const PAGES_QUERY = defineQuery(
  `*[_type == "page" && defined(slug.current)] | order(title asc){
    _id,
    title,
    "slug": slug.current
  }`
);
