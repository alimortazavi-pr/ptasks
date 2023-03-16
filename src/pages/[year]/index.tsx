//Components
import MonthsList from "@/components/layouts/MonthsList";
import TheNavigation from "@/components/layouts/TheNavigation";
import YearsList from "@/components/layouts/YearsList";

export default function TheYear() {
  return (
    <div>
      <TheNavigation title="ماه ها" isEnabledPreviousPageIcon={true} />
      <YearsList />
      <MonthsList />
    </div>
  );
}
