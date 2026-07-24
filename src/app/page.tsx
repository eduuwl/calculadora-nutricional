import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const beneficios = [
  {
    titulo: "Plano sob medida",
    descricao:
      "Cada orientação nutricional parte do seu histórico, rotina e objetivo — nada de dieta genérica.",
  },
  {
    titulo: "Acompanhamento contínuo",
    descricao:
      "Consultas de retorno para ajustar a estratégia conforme sua evolução real.",
  },
  {
    titulo: "Baseado em evidência",
    descricao:
      "Cálculos e recomendações fundamentados em fórmulas e diretrizes nutricionais reconhecidas.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-[#fcfcfb]">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-[#1baf7a]">
                Nutrição clínica personalizada
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#0b0b0b] md:text-5xl">
                Entenda seu corpo antes de mudar sua rotina
              </h1>
              <p className="mt-4 text-lg text-[#52514e]">
                Descubra sua Taxa Metabólica Basal, IMC e a distribuição ideal de macronutrientes
                em menos de 2 minutos — e receba orientação profissional para colocar isso em prática.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/calculadora"
                  className="rounded-full bg-[#1baf7a] px-6 py-3 text-base font-medium text-white transition hover:bg-[#189a6a]"
                >
                  Calcular meus indicadores
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm text-[#898781]">Você vai descobrir</dt>
                  <dd className="mt-1 text-lg font-medium text-[#0b0b0b]">
                    TMB, IMC, gasto calórico total e macros em gramas
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[#898781]">Tempo estimado</dt>
                  <dd className="mt-1 text-lg font-medium text-[#0b0b0b]">2 minutos</dd>
                </div>
                <div>
                  <dt className="text-sm text-[#898781]">Custo</dt>
                  <dd className="mt-1 text-lg font-medium text-[#0b0b0b]">Gratuito</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0b0b0b]">
            Sobre o consultório
          </h2>
          <p className="mt-4 max-w-3xl text-[#52514e]">
            Atendimento nutricional individualizado, com foco em resultados sustentáveis a longo
            prazo. Combinamos avaliação clínica, dados objetivos e acompanhamento próximo para que
            cada decisão alimentar faça sentido para a sua vida.
          </p>
        </section>

        <section className="bg-[#fcfcfb] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0b0b0b]">
              Por que acompanhar com um nutricionista
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {beneficios.map((beneficio) => (
                <div key={beneficio.titulo} className="rounded-xl border border-black/10 bg-white p-6">
                  <h3 className="text-lg font-medium text-[#0b0b0b]">{beneficio.titulo}</h3>
                  <p className="mt-2 text-sm text-[#52514e]">{beneficio.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0b0b0b]">
            Pronto para conhecer seus números?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#52514e]">
            Preencha a calculadora gratuita e receba seu diagnóstico nutricional inicial agora mesmo.
          </p>
          <Link
            href="/calculadora"
            className="mt-8 inline-block rounded-full bg-[#1baf7a] px-6 py-3 text-base font-medium text-white transition hover:bg-[#189a6a]"
          >
            Começar agora
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
