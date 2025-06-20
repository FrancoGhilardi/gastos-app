export type RegisterInput = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
};

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export interface MonthSelectorProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}
