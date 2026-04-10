import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-160px)] bg-sage-soft/30 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center mb-12">
          <div className="font-display text-5xl text-sage-ink leading-none">Fullty</div>
          <div className="text-[10px] text-sage-ink/60 tracking-[0.3em] mt-2">
            VINTAGE FURNITURE
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
}
