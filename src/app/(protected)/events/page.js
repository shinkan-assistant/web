import Dashboard from "@/components/templates/Dashboard";
import testData from "@/lib/firebase/data/test_data";
import EventSchema from "@/data/schemas/event";

export default function Events() {
  try {
    for (let event of testData.events) {
      console.log("event-parse");
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
