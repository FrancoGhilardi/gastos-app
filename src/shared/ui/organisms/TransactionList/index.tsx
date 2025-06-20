import { Transaction, TransactionType } from "@prisma/client";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CreditCard,
  Edit,
  Tag,
  Trash2,
} from "lucide-react";
import { Card } from "../Card";
import { CardContent } from "@shared/ui/molecules";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from "@shared/ui/atoms";
import { useState } from "react";
import { TransactionModal } from "../TransactionModal";

interface TransactionListProps {
  transactions: Omit<Transaction, "userId">[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentTransaction, setCurrentTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleEdit = () => {
    // setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    // setTransactionToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (currentTransaction) {
      // updateTransaction(currentTransaction.id, data)
    }
    setIsModalOpen(false);
    setCurrentTransaction(undefined);
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">
          No hay transacciones
        </h3>
        <p className="text-sm text-gray-400">
          No hay transacciones registradas para este mes.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors"
          >
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`rounded-full p-2 ${
                      transaction.type === TransactionType.INCOME
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {transaction.type === TransactionType.INCOME ? (
                      <ArrowUpCircle className="h-5 w-5" />
                    ) : (
                      <ArrowDownCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Tag className="h-3 w-3 text-gray-400" />
                      <h3 className="font-medium text-white">
                        {transaction.category}
                      </h3>
                    </div>
                    {transaction.notes && (
                      <p className="text-sm text-gray-400 mb-2">
                        {transaction.notes}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {formatDate(transaction.date.toISOString())}
                        </span>
                      </div>
                      {transaction.type === TransactionType.EXPENSE &&
                        transaction.paymentMethod && (
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-3 w-3" />
                            <span>{transaction.paymentMethod}</span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span
                      className={`text-lg font-semibold ${
                        transaction.type === TransactionType.INCOME
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === TransactionType.INCOME ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit()}
                      className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete()}
                      className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentTransaction(undefined);
        }}
        onSave={handleSave}
        transaction={currentTransaction}
      />
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-gray-800 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Esta acción no se puede deshacer. Se eliminará permanentemente
              esta transacción.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              // onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
