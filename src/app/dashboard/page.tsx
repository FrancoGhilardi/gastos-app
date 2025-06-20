"use client";

import { useState } from "react";
import { Button } from "@shared/ui/atoms";
import { MonthlySummary, MonthSelector } from "@shared/ui/molecules";
import { Plus } from "lucide-react";

const monthlyTransactions = [
  {
    id: "1",
    userId: 1,
    tipo: "ingreso",
    categoria: "Salario",
    monto: 5000,
    detalles: "Salario mensual",
    fecha: new Date().toISOString(),
  },
  {
    id: "2",
    userId: 2,
    tipo: "egreso",
    categoria: "Alimentos",
    monto: 1200,
    detalles: "Compra semanal",
    fecha: new Date().toISOString(),
    medioPago: "Tarjeta de crédito",
  },
];

export default function DashboardPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
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
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nueva transacción
          </Button>
        </div>
      </div>
      <MonthlySummary income={5000} expense={400} balance={3423423} />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Transacciones</h2>
        {false ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-4">
              <Plus className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No hay transacciones
            </h3>
            <p className="text-sm text-gray-400">
              No hay transacciones registradas para este mes.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {monthlyTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">
                      {transaction.categoria}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {transaction.detalles}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.fecha).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-medium ${
                        transaction.tipo === "ingreso"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.tipo === "ingreso" ? "+" : "-"}$
                      {transaction.monto.toFixed(2)}
                    </span>
                    {transaction.medioPago && (
                      <p className="text-xs text-gray-500">
                        {transaction.medioPago}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
