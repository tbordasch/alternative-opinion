import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#5C3A21]/20 dark:border-white/10 bg-white dark:bg-[#1a2332] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="group">
              <h2 className="text-lg sm:text-xl font-bold text-[#5C3A21] dark:text-white mb-1 transition-colors group-hover:text-[#8B4513] dark:group-hover:text-[#5B9BD5]">
                The Opinions
              </h2>
              <p className="text-xs sm:text-sm text-[#5C3A21]/70 dark:text-white/70 font-light">
                Space for encouraging thoughtful dialogue
              </p>
            </Link>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/about"
              className="text-xs sm:text-sm text-[#5C3A21]/70 dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5] transition-colors font-light"
            >
              About
            </Link>
            <Link
              href="/submit"
              className="text-xs sm:text-sm text-[#5C3A21]/70 dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5] transition-colors font-light"
            >
              Submit Opinion
            </Link>
            <Link
              href="/contact"
              className="text-xs sm:text-sm text-[#5C3A21]/70 dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5] transition-colors font-light"
            >
              Contact
            </Link>
            <Link
              href="/archive"
              className="text-xs sm:text-sm text-[#5C3A21]/70 dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5] transition-colors font-light"
            >
              Archive
            </Link>
          </nav>

          <div className="text-center md:text-right">
            <p className="text-xs text-[#5C3A21]/50 dark:text-white/50 font-light">
              © {new Date().getFullYear()} The Opinions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

