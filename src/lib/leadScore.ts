import type { Objetivo } from "./nutrition";

export type Qualificacao = "quente" | "morno" | "frio";

export interface LeadScoreInput {
  imc: number;
  objetivo: Objetivo;
  whatsapp?: string | null;
}

export interface LeadScoreResult {
  score: number;
  qualificacao: Qualificacao;
}

function pontosIMC(imc: number): number {
  return imc < 18.5 || imc >= 25 ? 2 : 0;
}

function pontosObjetivo(objetivo: Objetivo): number {
  return objetivo === "manter" ? 0 : 2;
}

function pontosWhatsapp(whatsapp?: string | null): number {
  return whatsapp && whatsapp.trim().length > 0 ? 1 : 0;
}

export function calcularQualificacaoLead({ imc, objetivo, whatsapp }: LeadScoreInput): LeadScoreResult {
  const score = pontosIMC(imc) + pontosObjetivo(objetivo) + pontosWhatsapp(whatsapp);

  const qualificacao: Qualificacao = score >= 4 ? "quente" : score >= 2 ? "morno" : "frio";

  return { score, qualificacao };
}
