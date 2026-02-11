import Link from "next/link";


export default function Page() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">Blog Post</h1>
        <Link
          href="/blog"
          className="mt-4 inline-block text-primary underline hover:no-underline"
        >
          Open Blog Post →
        </Link>
      </div>
    </>
  );
}