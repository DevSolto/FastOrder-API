-- CreateTable
CREATE TABLE "OrdersUnities" (
    "orderId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "type" "UnitType" NOT NULL,

    CONSTRAINT "OrdersUnities_pkey" PRIMARY KEY ("unitId","orderId")
);

-- AddForeignKey
ALTER TABLE "OrdersUnities" ADD CONSTRAINT "OrdersUnities_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersUnities" ADD CONSTRAINT "OrdersUnities_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
