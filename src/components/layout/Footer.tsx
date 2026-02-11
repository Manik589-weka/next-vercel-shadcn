import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps = {}) {
  return (
    <footer className={cn("border-t border-gray-200 bg-gray-50", className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} WEKA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
