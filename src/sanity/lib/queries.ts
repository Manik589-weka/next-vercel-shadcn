import { defineQuery } from "next-sanity";

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
