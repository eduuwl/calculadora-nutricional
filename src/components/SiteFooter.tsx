export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-[#fcfcfb] py-8 text-sm text-[#52514e]">
      <div className="mx-auto max-w-5xl px-6">
        <p>&copy; {new Date().getFullYear()} Nutri Vida. Todos os direitos reservados.</p>
        <p className="mt-1 text-[#898781]">
          As estimativas desta calculadora são informativas e não substituem uma avaliação nutricional individual.
        </p>
      </div>
    </footer>
  );
}
