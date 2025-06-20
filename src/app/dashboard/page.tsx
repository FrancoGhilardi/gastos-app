"use client";

import { useState } from "react";
import { Button } from "@shared/ui/atoms";
import { MonthlySummary, MonthSelector } from "@shared/ui/molecules";
import { Plus } from "lucide-react";
import { TransactionList, TransactionModal } from "@shared/ui/organisms";
import { TransactionType } from "@prisma/client";

const monthlyTransactions = [
  {
    id: 1,
    type: TransactionType.INCOME,
    category: "Test",
    amount: 0,
    notes: "adasd",
    date: new Date(),
    paymentMethod: "Efectivo",
  },
  {
    id: 2,
    type: TransactionType.EXPENSE,
    category: "test 2",
    amount: 0,
    notes: "adqwe",
    date: new Date(),
    paymentMethod: "Tarjeta de credito",
  },
];

export default function DashboardPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handleAddTransaction = (data: any) => {
    setIsModalOpen(false);
  };
  return (
    <div className="space-y-6 ml-0 md:ml-0">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <MonthSelector
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthChange={handleMonthChange}
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nueva transacción
          </Button>
        </div>
      </div>
      <MonthlySummary income={5000} expense={400} balance={3423423} />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          Transacciones del mes
        </h2>
        <TransactionList transactions={monthlyTransactions} />
      </div>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTransaction}
      />
    </div>
  );
}
