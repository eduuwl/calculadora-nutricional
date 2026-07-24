"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-[#1baf7a] px-6 py-3 text-base font-medium text-white transition hover:bg-[#189a6a] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fcfcfb] px-6">
      <form action={formAction} className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8">
        <h1 className="text-xl font-semibold text-[#0b0b0b]">Painel administrativo</h1>
        <p className="mt-1 text-sm text-[#52514e]">Informe a senha para acessar os leads.</p>

        <label className="mt-6 block text-sm font-medium text-[#52514e]">
          Senha
          <input
            name="password"
            type="password"
            required
            autoFocus
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-[#0b0b0b] outline-none focus:ring-2 focus:ring-[#1baf7a]/40"
          />
        </label>
        {state.error && <p className="mt-2 text-sm text-[#d03b3b]">{state.error}</p>}

        <div className="mt-6">
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}
