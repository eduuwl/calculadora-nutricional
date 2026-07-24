import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-[#fcfcfb]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[#0b0b0b]">
          Nutri Vida
        </Link>
        <Link
          href="/calculadora"
          className="rounded-full bg-[#1baf7a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#189a6a]"
        >
          Calculadora gratuita
        </Link>
      </div>
    </header>
  );
}
