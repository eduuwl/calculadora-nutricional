"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { calcularEPersistir, type CalculoState } from "@/app/calculadora/actions";
import { ResultadoCalculo } from "./ResultadoCalculo";

const initialState: CalculoState = {};

function fieldError(errors: CalculoState["errors"], field: string) {
  const message = errors?.[field]?.[0];
  if (!message) return null;
  return <p className="mt-1 text-sm text-[#d03b3b]">{message}</p>;
}

function inputClass(hasError: boolean) {
  return `mt-1 w-full rounded-lg border px-3 py-2 text-[#0b0b0b] outline-none focus:ring-2 focus:ring-[#1baf7a]/40 ${
    hasError ? "border-[#d03b3b]" : "border-black/15"
  }`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-[#1baf7a] px-6 py-3 text-base font-medium text-white transition hover:bg-[#189a6a] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Calculando..." : "Calcular meus indicadores"}
    </button>
  );
}

export function CalculadoraForm() {
  const [state, formAction] = useActionState(calcularEPersistir, initialState);

  if (state.resultado) {
    return <ResultadoCalculo resultado={state.resultado} />;
  }

  return (
    <form action={formAction} className="rounded-2xl border border-black/10 bg-white p-8">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-lg font-semibold text-[#0b0b0b]">Seus dados</legend>

        <label className="block text-sm font-medium text-[#52514e]">
          Peso (kg)
          <input name="peso" type="number" step="0.1" required className={inputClass(!!state.errors?.peso)} />
          {fieldError(state.errors, "peso")}
        </label>

        <label className="block text-sm font-medium text-[#52514e]">
          Altura (cm)
          <input name="altura" type="number" step="0.1" required className={inputClass(!!state.errors?.altura)} />
          {fieldError(state.errors, "altura")}
        </label>

        <label className="block text-sm font-medium text-[#52514e]">
          Idade
          <input name="idade" type="number" required className={inputClass(!!state.errors?.idade)} />
          {fieldError(state.errors, "idade")}
        </label>

        <label className="block text-sm font-medium text-[#52514e]">
          Sexo biológico
          <select name="sexo" required defaultValue="" className={inputClass(!!state.errors?.sexo)}>
            <option value="" disabled>
              Selecione
            </option>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
          {fieldError(state.errors, "sexo")}
        </label>

        <label className="block text-sm font-medium text-[#52514e]">
          Nível de atividade física
          <select
            name="nivelAtividade"
            required
            defaultValue=""
            className={inputClass(!!state.errors?.nivelAtividade)}
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="sedentario">Sedentário</option>
            <option value="leve">Leve (1-3x/semana)</option>
            <option value="moderado">Moderado (3-5x/semana)</option>
            <option value="intenso">Intenso (6-7x/semana)</option>
            <option value="muito_intenso">Muito intenso (2x/dia)</option>
          </select>
          {fieldError(state.errors, "nivelAtividade")}
        </label>

        <label className="block text-sm font-medium text-[#52514e]">
          Objetivo
          <select name="objetivo" required defaultValue="" className={inputClass(!!state.errors?.objetivo)}>
            <option value="" disabled>
              Selecione
            </option>
            <option value="emagrecer">Emagrecer</option>
            <option value="manter">Manter peso</option>
            <option value="ganhar_massa">Ganhar massa</option>
          </select>
          {fieldError(state.errors, "objetivo")}
        </label>

        <label className="block text-sm font-medium text-[#52514e] sm:col-span-2">
          Método de cálculo da TMB
          <select
            name="metodoTMB"
            required
            defaultValue="mifflin_st_jeor"
            className={inputClass(!!state.errors?.metodoTMB)}
          >
            <option value="mifflin_st_jeor">Mifflin-St Jeor (recomendada)</option>
            <option value="harris_benedict">Harris-Benedict</option>
          </select>
          {fieldError(state.errors, "metodoTMB")}
        </label>
      </fieldset>

      <fieldset className="mt-8 grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-lg font-semibold text-[#0b0b0b]">
          Onde enviamos seu resultado
        </legend>

        <label className="block text-sm font-medium text-[#52514e] sm:col-span-2">
          Nome completo
          <input name="nome" type="text" required className={inputClass(!!state.errors?.nome)} />
          {fieldError(state.errors, "nome")}
        </label>

        <label className="block text-sm font-medium text-[#52514e]">
          E-mail
          <input name="email" type="email" required className={inputClass(!!state.errors?.email)} />
          {fieldError(state.errors, "email")}
        </label>

        <label className="block text-sm font-medium text-[#52514e]">
          WhatsApp (opcional)
          <input name="whatsapp" type="tel" className={inputClass(!!state.errors?.whatsapp)} />
          {fieldError(state.errors, "whatsapp")}
        </label>
      </fieldset>

      <p className="mt-4 text-xs text-[#898781]">
        Ao continuar, você concorda em ser contatado pela nossa equipe sobre este resultado.
      </p>

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
