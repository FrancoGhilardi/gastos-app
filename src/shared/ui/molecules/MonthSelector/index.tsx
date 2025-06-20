import { SelectContent } from "@radix-ui/react-select";
import { months } from "@shared/constants";
import { MonthSelectorProps } from "@shared/types/types";
import {
  Button,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/atoms";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MonthSelector({
  currentMonth,
  currentYear,
  onMonthChange,
}: MonthSelectorProps) {
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const handlePreviousMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    onMonthChange(newMonth, newYear);
  };

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    onMonthChange(newMonth, newYear);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePreviousMonth}
        className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-2">
        <Select
          value={currentMonth.toString()}
          onValueChange={(value) =>
            onMonthChange(Number.parseInt(value), currentYear)
          }
        >
          <SelectTrigger className="w-[120px] bg-gray-800 border-gray-600 text-white">
            <SelectValue>{months[currentMonth]}</SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            {months.map((month, index) => (
              <SelectItem
                key={index}
                value={index.toString()}
                className="text-white hover:bg-gray-700"
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentYear.toString()}
          onValueChange={(value) =>
            onMonthChange(currentMonth, Number.parseInt(value))
          }
        >
          <SelectTrigger className="w-[100px] bg-gray-800 border-gray-600 text-white">
            <SelectValue>{currentYear}</SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            {years.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
                className="text-white hover:bg-gray-700"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNextMonth}
        className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
