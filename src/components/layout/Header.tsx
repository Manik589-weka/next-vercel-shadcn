import { cn } from "@/lib/utils";

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps = {}) {
  return (
    <header className={cn("border-b border-gray-200 bg-white", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <span className="text-lg font-semibold">WEKA</span>
          <nav className="flex gap-6">
            {/* Add nav links here */}
          </nav>
        </div>
      </div>
    </header>
  );
}
