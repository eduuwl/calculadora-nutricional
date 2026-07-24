"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { calcularIndicadores, type ResultadoCalculo } from "@/lib/nutrition";
import { enviarResultadoPorEmail } from "@/lib/email";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo"),
  email: z.string().trim().email("E-mail inválido"),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  peso: z.coerce.number({ message: "Peso inválido" }).min(20, "Peso mínimo de 20kg").max(400, "Peso máximo de 400kg"),
  altura: z.coerce.number({ message: "Altura inválida" }).min(50, "Altura mínima de 50cm").max(250, "Altura máxima de 250cm"),
  idade: z.coerce.number({ message: "Idade inválida" }).int().min(10, "Idade mínima de 10 anos").max(120, "Idade máxima de 120 anos"),
  sexo: z.enum(["M", "F"], { message: "Selecione o sexo biológico" }),
  nivelAtividade: z.enum(["sedentario", "leve", "moderado", "intenso", "muito_intenso"], {
    message: "Selecione o nível de atividade",
  }),
  objetivo: z.enum(["emagrecer", "manter", "ganhar_massa"], {
    message: "Selecione o objetivo",
  }),
  metodoTMB: z.enum(["mifflin_st_jeor", "harris_benedict"], {
    message: "Selecione o método de cálculo",
  }),
});

export interface CalculoState {
  errors?: Record<string, string[]>;
  message?: string;
  resultado?: ResultadoCalculo;
}

export async function calcularEPersistir(
  _prevState: CalculoState,
  formData: FormData
): Promise<CalculoState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const { nome, email, whatsapp, ...dados } = parsed.data;

  const resultado = calcularIndicadores(dados);

  const lead = await prisma.lead.upsert({
    where: { email },
    update: { nome, whatsapp: whatsapp || undefined },
    create: { nome, email, whatsapp: whatsapp || undefined },
  });

  await prisma.calculo.create({
    data: {
      leadId: lead.id,
      peso: dados.peso,
      altura: dados.altura,
      idade: dados.idade,
      sexo: dados.sexo,
      nivelAtividade: dados.nivelAtividade,
      objetivo: dados.objetivo,
      metodoTMB: dados.metodoTMB,
      tmb: resultado.tmb,
      imc: resultado.imc,
      caloriasTotais: resultado.caloriasTotais,
      proteinaG: resultado.proteinaG,
      carboG: resultado.carboG,
      gorduraG: resultado.gorduraG,
    },
  });

  try {
    await enviarResultadoPorEmail({ nome, email, whatsapp, objetivo: dados.objetivo, resultado });
  } catch (error) {
    console.error("Falha ao enviar e-mail de resultado:", error);
  }

  return { message: "ok", resultado };
}
