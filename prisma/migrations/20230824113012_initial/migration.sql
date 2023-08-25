-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "guildId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild" (
    "id" TEXT NOT NULL,

    CONSTRAINT "guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_userId_key" ON "member"("userId");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
