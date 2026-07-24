import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LABEL_METODO_TMB, LABEL_OBJETIVO, type Objetivo, type MetodoTMB } from "@/lib/nutrition";
import { calcularQualificacaoLead, type Qualificacao } from "@/lib/leadScore";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Leads | Painel administrativo",
};

const formatadorData = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const ESTILO_QUALIFICACAO: Record<Qualificacao, string> = {
  quente: "bg-[#ffe4d6] text-[#b0450a]",
  morno: "bg-[#fff4cf] text-[#8a6a00]",
  frio: "bg-black/5 text-[#52514e]",
};

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      calculos: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#fcfcfb] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#0b0b0b]">Leads</h1>
            <p className="mt-1 text-sm text-[#52514e]">{leads.length} lead(s) capturado(s)</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-[#0b0b0b] transition hover:bg-black/5"
            >
              Sair
            </button>
          </form>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-black/10 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-[#898781]">
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Contato</th>
                <th className="px-4 py-3 font-medium">Objetivo</th>
                <th className="px-4 py-3 font-medium">TMB</th>
                <th className="px-4 py-3 font-medium">GCT</th>
                <th className="px-4 py-3 font-medium">Qualificação</th>
                <th className="px-4 py-3 font-medium">Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const calculo = lead.calculos[0];
                const qualificacao = calculo
                  ? calcularQualificacaoLead({
                      imc: calculo.imc,
                      objetivo: calculo.objetivo as Objetivo,
                      whatsapp: lead.whatsapp,
                    })
                  : null;

                return (
                  <tr key={lead.id} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3 font-medium text-[#0b0b0b]">{lead.nome}</td>
                    <td className="px-4 py-3 text-[#52514e]">
                      <div>{lead.email}</div>
                      {lead.whatsapp && <div className="text-xs text-[#898781]">{lead.whatsapp}</div>}
                    </td>
                    <td className="px-4 py-3 text-[#52514e]">
                      {calculo ? LABEL_OBJETIVO[calculo.objetivo as Objetivo] ?? calculo.objetivo : "—"}
                    </td>
                    <td className="px-4 py-3 text-[#52514e]">
                      {calculo ? (
                        <>
                          {Math.round(calculo.tmb)} kcal
                          <div className="text-xs text-[#898781]">
                            {LABEL_METODO_TMB[calculo.metodoTMB as MetodoTMB] ?? calculo.metodoTMB}
                          </div>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#52514e]">
                      {calculo ? `${Math.round(calculo.caloriasTotais)} kcal` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {qualificacao ? (
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${ESTILO_QUALIFICACAO[qualificacao.qualificacao]}`}
                        >
                          {qualificacao.qualificacao}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#898781]">{formatadorData.format(lead.createdAt)}</td>
                  </tr>
                );
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[#898781]">
                    Nenhum lead capturado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
