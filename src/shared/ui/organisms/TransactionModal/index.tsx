import { Transaction, TransactionType } from "@prisma/client";
import {
  egresoCategories,
  ingresoCategories,
  mediosPago,
} from "@shared/constants";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@shared/ui/atoms";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CreditCard,
  DollarSign,
  Tag,
} from "lucide-react";
import { useState } from "react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, "id" | "userId">) => void;
  transaction?: Transaction;
}

export function TransactionModal({
  isOpen,
  onClose,
  onSave,
  transaction,
}: TransactionModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Transaction, "id" | "userId">>({
    type: TransactionType.INCOME,
    category: "",
    amount: 0,
    notes: "",
    date: new Date(),
    paymentMethod: "Efectivo",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.amount || !formData.date) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      onSave({
        ...formData,
        date: new Date(formData.date),
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = (value: TransactionType) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
      category: "", // Reset category when type changes
      paymentMethod: value === TransactionType.EXPENSE ? "Efectivo" : undefined,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "monto" ? Number.parseFloat(value) || 0 : value,
    }));
  };

  const categories =
    formData.type === TransactionType.INCOME
      ? ingresoCategories
      : egresoCategories;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {transaction ? "Editar transacción" : "Nueva transacción"}
            {formData.type === TransactionType.INCOME ? (
              <ArrowUpCircle className="h-5 w-5 text-green-500" />
            ) : (
              <ArrowDownCircle className="h-5 w-5 text-red-500" />
            )}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de transacción */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Tipo de transacción</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={handleTypeChange}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={TransactionType.INCOME}
                  id={TransactionType.INCOME}
                  className="border-green-500 text-green-500"
                />
                <Label
                  htmlFor={TransactionType.INCOME}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <ArrowUpCircle className="h-4 w-4 text-green-500" />
                  Ingreso
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={TransactionType.EXPENSE}
                  id={TransactionType.EXPENSE}
                  className="border-red-500 text-red-500"
                />
                <Label
                  htmlFor={TransactionType.EXPENSE}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <ArrowDownCircle className="h-4 w-4 text-red-500" />
                  Egreso
                </Label>
              </div>
            </RadioGroup>
          </div>
          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="categoria" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categoría
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, categoria: value }))
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-white hover:bg-gray-600"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Medio de pago (solo para egresos) */}
          {formData.type === TransactionType.EXPENSE && (
            <div className="space-y-2">
              <Label htmlFor="medioPago" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Medio de pago
              </Label>
              <Select
                value={formData.paymentMethod ?? ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, medioPago: value }))
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecciona un medio de pago" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {mediosPago.map((medio) => (
                    <SelectItem
                      key={medio}
                      value={medio}
                      className="text-white hover:bg-gray-600"
                    >
                      {medio}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {/* Monto */}
          <div className="space-y-2">
            <Label htmlFor="monto" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Monto
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="monto"
                name="monto"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={formData.amount || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Fecha */}
          <div className="space-y-2">
            <Label htmlFor="fecha" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fecha
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="fecha"
                name="fecha"
                type="date"
                className="pl-10 bg-gray-700 border-gray-600 text-white"
                value={formData.date.toISOString()}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Detalles */}
          <div className="space-y-2">
            <Label htmlFor="detalles">Detalles (opcional)</Label>
            <Textarea
              id="detalles"
              name="detalles"
              placeholder="Agrega una descripción..."
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none"
              value={formData.notes ?? ""}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <DialogFooter className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.category || !formData.amount}
              className={`${
                formData.type === TransactionType.INCOME
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isLoading
                ? "Guardando..."
                : transaction
                ? "Actualizar"
                : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
