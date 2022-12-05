//Components
import TheNavigation from "@/components/layouts/TheNavigation";
import YearsList from "@/components/layouts/YearsList";

export default function Index() {
  return (
    <div>
      <TheNavigation title="سال ها" isEnabledPreviousPage={false} />
      <YearsList />
    </div>
  );
}
