-- CreateTable
CREATE TABLE "form_setting" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "form_setting_pkey" PRIMARY KEY ("id")
);
