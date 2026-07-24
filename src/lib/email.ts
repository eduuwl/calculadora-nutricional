import { Resend } from "resend";
import { classificacaoIMC, LABEL_OBJETIVO, type Objetivo, type ResultadoCalculo } from "./nutrition";
import { calcularQualificacaoLead, type Qualificacao } from "./leadScore";

const FROM = process.env.EMAIL_FROM ?? "Nutri Vida <onboarding@resend.dev>";

interface EnviarResultadoEmailInput {
  nome: string;
  email: string;
  whatsapp?: string | null;
  objetivo: Objetivo;
  resultado: ResultadoCalculo;
}

function mensagemPorQualificacao(qualificacao: Qualificacao): string {
  switch (qualificacao) {
    case "quente":
      return "Pelos seus dados, um acompanhamento nutricional pode acelerar bastante o seu resultado. Responda este e-mail que alguém da nossa equipe entra em contato com você.";
    case "morno":
      return "Se quiser ajuda para colocar esses números em prática no dia a dia, é só responder este e-mail.";
    default:
      return "Guarde esses números — eles são o ponto de partida para qualquer ajuste na sua alimentação.";
  }
}

export async function enviarResultadoPorEmail({
  nome,
  email,
  whatsapp,
  objetivo,
  resultado,
}: EnviarResultadoEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY não configurada — e-mail de resultado não enviado.");
    return;
  }

  const { qualificacao } = calcularQualificacaoLead({ imc: resultado.imc, objetivo, whatsapp });
  const primeiroNome = nome.trim().split(" ")[0];

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #0b0b0b;">
      <h1 style="font-size: 20px;">Olá, ${primeiroNome}!</h1>
      <p>Aqui está o resultado do seu cálculo na Nutri Vida:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr>
          <td style="padding: 8px 0; color: #898781;">TMB</td>
          <td style="text-align: right; font-weight: 600;">${Math.round(resultado.tmb)} kcal/dia</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #898781;">IMC</td>
          <td style="text-align: right; font-weight: 600;">${resultado.imc.toFixed(1)} (${classificacaoIMC(resultado.imc)})</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #898781;">Gasto calórico total</td>
          <td style="text-align: right; font-weight: 600;">${Math.round(resultado.caloriasTotais)} kcal/dia</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #898781;">Objetivo</td>
          <td style="text-align: right; font-weight: 600;">${LABEL_OBJETIVO[objetivo]}</td>
        </tr>
      </table>
      <p style="color: #898781;">
        Macros recomendados: ${Math.round(resultado.proteinaG)}g proteína ·
        ${Math.round(resultado.carboG)}g carboidrato · ${Math.round(resultado.gorduraG)}g gordura.
      </p>
      <p>${mensagemPorQualificacao(qualificacao)}</p>
      <p style="color: #898781; font-size: 12px; margin-top: 32px;">
        Nutri Vida — este e-mail foi enviado porque você usou nossa calculadora nutricional.
      </p>
    </div>
  `;

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Seu resultado da calculadora Nutri Vida",
    html,
  });

  if (error) {
    console.error("Falha ao enviar e-mail de resultado:", error);
  }
}
