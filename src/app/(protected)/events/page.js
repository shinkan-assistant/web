import Dashboard from "@/components/templates/Dashboard";
import mockEvents from "@/data/mock/event";
import EventSchema from "@/data/schemas/event";

export default function Events() {
  try {
    for (let event of mockEvents) {
      EventSchema.parse(event);
    }
    console.log("バリデーション成功")
  } catch (error) {
    for (let issue of error.issues) {
      console.log(issue.path, issue.message);
    }
  }
  return (
    <Dashboard>
      <div>events</div>
    </Dashboard>
  );
}
