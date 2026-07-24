import { classificacaoIMC, LABEL_METODO_TMB, type ResultadoCalculo as ResultadoCalculoType } from "@/lib/nutrition";
import { MacroChart } from "./MacroChart";

interface ResultadoCalculoProps {
  resultado: ResultadoCalculoType;
}

export function ResultadoCalculo({ resultado }: ResultadoCalculoProps) {
  const { tmb, imc, caloriasTotais, proteinaG, carboG, gorduraG, metodoTMB } = resultado;

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-8">
      <h2 className="text-xl font-semibold text-[#0b0b0b]">Seu resultado</h2>

      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div>
          <p className="text-sm text-[#898781]">TMB</p>
          <p className="mt-1 text-2xl font-semibold text-[#0b0b0b]">{Math.round(tmb)}</p>
          <p className="text-xs text-[#898781]">kcal/dia · {LABEL_METODO_TMB[metodoTMB]}</p>
        </div>
        <div>
          <p className="text-sm text-[#898781]">IMC</p>
          <p className="mt-1 text-2xl font-semibold text-[#0b0b0b]">{imc.toFixed(1)}</p>
          <p className="text-xs text-[#898781]">{classificacaoIMC(imc)}</p>
        </div>
        <div>
          <p className="text-sm text-[#898781]">Gasto calórico total</p>
          <p className="mt-1 text-2xl font-semibold text-[#0b0b0b]">{Math.round(caloriasTotais)}</p>
          <p className="text-xs text-[#898781]">kcal/dia</p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm text-[#898781]">Distribuição de macros</p>
        <div className="mt-3">
          <MacroChart proteinaG={proteinaG} carboG={carboG} gorduraG={gorduraG} />
        </div>
      </div>

      <p className="mt-8 text-xs text-[#898781]">
        Recebemos seus dados. Um nutricionista da nossa equipe pode entrar em contato para aprofundar
        essa avaliação.
      </p>
    </div>
  );
}
