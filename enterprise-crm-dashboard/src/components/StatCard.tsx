import type { LucideIcon } from "lucide-react";
import { memo } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "slate" | "green" | "red" | "blue" | "amber" | "purple";
}

const toneClassMap = {
  slate:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  green:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  amber:
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  purple:
    "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  tone = "slate",
}: StatCardProps) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div className={`rounded-lg p-3 ${toneClassMap[tone]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

export default memo(StatCard);