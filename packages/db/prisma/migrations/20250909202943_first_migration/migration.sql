-- CreateTable
CREATE TABLE "public"."Card" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "containerId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CardContainer" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "CardContainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "public"."CardContainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardContainer" ADD CONSTRAINT "CardContainer_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
