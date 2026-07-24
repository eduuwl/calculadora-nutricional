"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MacroChartProps {
  proteinaG: number;
  carboG: number;
  gorduraG: number;
}

const SERIES = {
  proteina: { label: "Proteína", color: "#2a78d6" },
  carbo: { label: "Carboidrato", color: "#eb6834" },
  gordura: { label: "Gordura", color: "#1baf7a" },
} as const;

export function MacroChart({ proteinaG, carboG, gorduraG }: MacroChartProps) {
  const total = proteinaG + carboG + gorduraG;
  const data = [
    { name: "Macros", proteina: round(proteinaG), carbo: round(carboG), gordura: round(gorduraG) },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={72}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip
            formatter={(value, key) => [
              `${round(Number(value))} g`,
              SERIES[key as keyof typeof SERIES]?.label ?? String(key),
            ]}
            contentStyle={{
              background: "#fcfcfb",
              border: "1px solid rgba(11,11,11,0.10)",
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Bar dataKey="proteina" stackId="macros" fill={SERIES.proteina.color} stroke="#fcfcfb" strokeWidth={2} radius={[6, 0, 0, 6]} />
          <Bar dataKey="carbo" stackId="macros" fill={SERIES.carbo.color} stroke="#fcfcfb" strokeWidth={2} />
          <Bar dataKey="gordura" stackId="macros" fill={SERIES.gordura.color} stroke="#fcfcfb" strokeWidth={2} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
        {(
          [
            ["proteina", proteinaG],
            ["carbo", carboG],
            ["gordura", gorduraG],
          ] as const
        ).map(([key, gramas]) => (
          <div key={key} className="flex flex-col gap-1">
            <dt className="flex items-center gap-2 text-[#52514e]">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: SERIES[key].color }}
                aria-hidden
              />
              {SERIES[key].label}
            </dt>
            <dd className="text-base font-medium text-[#0b0b0b]">
              {round(gramas)} g
              <span className="ml-1 text-xs font-normal text-[#898781]">
                ({total > 0 ? Math.round((gramas / total) * 100) : 0}%)
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function round(value: number): number {
  return Math.round(value);
}
