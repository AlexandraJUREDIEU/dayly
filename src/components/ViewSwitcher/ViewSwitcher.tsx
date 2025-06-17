import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaskStore } from "@/store/useTaskStore";
import type { ViewMode } from "@/store/useTaskStore";

export function ViewSwitcher() {
  const viewMode = useTaskStore((state) => state.viewMode);
  const setViewMode = useTaskStore((state) => state.setViewMode);

  const isViewMode = (value: string): value is ViewMode =>
  ["kanban", "list", "calendar"].includes(value);

  return (
    <Tabs 
    value={viewMode} 
    onValueChange={(value) => {
    if (isViewMode(value)) {
      setViewMode(value);
        }
    }}
    className="w-full"
    >
      <TabsList>
        <TabsTrigger value="kanban">Kanban</TabsTrigger>
        <TabsTrigger value="list">Liste</TabsTrigger>
        <TabsTrigger value="calendar">Calendrier</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}