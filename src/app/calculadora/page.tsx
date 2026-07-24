import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CalculadoraForm } from "@/components/calculadora/CalculadoraForm";

export const metadata: Metadata = {
  title: "Calculadora Nutricional | Nutri Vida",
  description: "Calcule sua TMB, IMC, gasto calórico total e distribuição de macros.",
};

export default function CalculadoraPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#fcfcfb]">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-[#0b0b0b]">
            Calculadora Nutricional
          </h1>
          <p className="mt-3 text-[#52514e]">
            Preencha os campos abaixo para calcular sua Taxa Metabólica Basal, IMC, gasto calórico
            total e a distribuição recomendada de macronutrientes.
          </p>

          <div className="mt-8">
            <CalculadoraForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
