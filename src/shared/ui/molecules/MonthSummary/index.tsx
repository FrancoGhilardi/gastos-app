"use client";

import { Card } from "@shared/ui/organisms";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import { CardHeader } from "../CardHeader";
import { CardTitle } from "@shared/ui/atoms";
import { CardContent } from "../CardContent";

interface MonthlySummaryProps {
  income: number;
  expense: number;
  balance: number;
}

export function MonthlySummary({
  income = 0,
  expense = 0,
  balance = 0,
}: MonthlySummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Ingresos
          </CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {formatCurrency(income)}
          </div>
          <p className="text-xs text-gray-400">Total de ingresos del mes</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Gastos
          </CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            {formatCurrency(expense)}
          </div>
          <p className="text-xs text-gray-400">Total de gastos del mes</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Balance
          </CardTitle>
          <DollarSign
            className={`h-4 w-4 ${
              balance >= 0 ? "text-green-500" : "text-red-500"
            }`}
          />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-gray-400">Sobrante del mes</p>
        </CardContent>
      </Card>
    </div>
  );
}
