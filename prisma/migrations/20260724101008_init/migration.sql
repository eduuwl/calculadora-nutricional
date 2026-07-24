-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculo" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,
    "nivelAtividade" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "metodoTMB" TEXT NOT NULL DEFAULT 'mifflin_st_jeor',
    "tmb" DOUBLE PRECISION NOT NULL,
    "imc" DOUBLE PRECISION NOT NULL,
    "caloriasTotais" DOUBLE PRECISION NOT NULL,
    "proteinaG" DOUBLE PRECISION NOT NULL,
    "carboG" DOUBLE PRECISION NOT NULL,
    "gorduraG" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Calculo_leadId_idx" ON "Calculo"("leadId");

-- AddForeignKey
ALTER TABLE "Calculo" ADD CONSTRAINT "Calculo_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
