export type Sexo = "M" | "F";

export type MetodoTMB = "mifflin_st_jeor" | "harris_benedict";

export type NivelAtividade =
  | "sedentario"
  | "leve"
  | "moderado"
  | "intenso"
  | "muito_intenso";

export type Objetivo = "emagrecer" | "manter" | "ganhar_massa";

export const LABEL_OBJETIVO: Record<Objetivo, string> = {
  emagrecer: "Emagrecer",
  manter: "Manter peso",
  ganhar_massa: "Ganhar massa",
};

export const LABEL_METODO_TMB: Record<MetodoTMB, string> = {
  mifflin_st_jeor: "Mifflin-St Jeor",
  harris_benedict: "Harris-Benedict",
};

export function classificacaoIMC(imc: number): string {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso adequado";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

export const FATOR_ATIVIDADE: Record<NivelAtividade, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  muito_intenso: 1.9,
};

// g de proteína por kg e % de calorias em gordura, por objetivo.
// Mais proteína em emagrecer/ganhar massa para preservar/construir massa magra.
const PERFIL_MACROS: Record<Objetivo, { proteinaPorKg: number; percentualGordura: number }> = {
  emagrecer: { proteinaPorKg: 2.2, percentualGordura: 0.25 },
  manter: { proteinaPorKg: 1.8, percentualGordura: 0.27 },
  ganhar_massa: { proteinaPorKg: 2.0, percentualGordura: 0.25 },
};

export interface DadosCalculo {
  peso: number;
  altura: number;
  idade: number;
  sexo: Sexo;
  nivelAtividade: NivelAtividade;
  objetivo: Objetivo;
  metodoTMB: MetodoTMB;
}

export interface ResultadoCalculo {
  tmb: number;
  imc: number;
  caloriasTotais: number;
  proteinaG: number;
  carboG: number;
  gorduraG: number;
  metodoTMB: MetodoTMB;
}

export function calcularTMB({
  peso,
  altura,
  idade,
  sexo,
  metodoTMB,
}: Pick<DadosCalculo, "peso" | "altura" | "idade" | "sexo" | "metodoTMB">): number {
  if (metodoTMB === "harris_benedict") {
    return sexo === "M"
      ? 66 + 13.7 * peso + 5 * altura - 6.8 * idade
      : 655 + 9.6 * peso + 1.8 * altura - 4.7 * idade;
  }

  const base = 10 * peso + 6.25 * altura - 5 * idade;
  return sexo === "M" ? base + 5 : base - 161;
}

export function calcularIMC({ peso, altura }: Pick<DadosCalculo, "peso" | "altura">): number {
  const alturaMetros = altura / 100;
  return peso / (alturaMetros * alturaMetros);
}

export function calcularGCT(tmb: number, nivelAtividade: NivelAtividade): number {
  return tmb * FATOR_ATIVIDADE[nivelAtividade];
}

export function calcularMacros(peso: number, caloriasTotais: number, objetivo: Objetivo) {
  const { proteinaPorKg, percentualGordura } = PERFIL_MACROS[objetivo];

  const proteinaG = peso * proteinaPorKg;
  const proteinaKcal = proteinaG * 4;

  const gorduraKcal = caloriasTotais * percentualGordura;
  const gorduraG = gorduraKcal / 9;

  const carboKcal = Math.max(0, caloriasTotais - proteinaKcal - gorduraKcal);
  const carboG = carboKcal / 4;

  return { proteinaG, carboG, gorduraG };
}

export function calcularIndicadores(dados: DadosCalculo): ResultadoCalculo {
  const tmb = calcularTMB(dados);
  const imc = calcularIMC(dados);
  const caloriasTotais = calcularGCT(tmb, dados.nivelAtividade);
  const { proteinaG, carboG, gorduraG } = calcularMacros(dados.peso, caloriasTotais, dados.objetivo);

  return { tmb, imc, caloriasTotais, proteinaG, carboG, gorduraG, metodoTMB: dados.metodoTMB };
}
