import { promises as fs } from 'fs';
import EventList from "@/components/app/events/List";
import { RoleEnum } from "@/data/enums/participant";

export default async function Events() {
  const roleName = RoleEnum.organizer;

  const mockEventsJsonPath = "./data/mock/event.json";
  const mockEventsFileContents = await fs.readFile(mockEventsJsonPath, 'utf8');
  // JSON文字列をJavaScriptオブジェクトにパースします。
  const mockEvents = JSON.parse(mockEventsFileContents);  
  
  return (
    <EventList events={mockEvents} mockRoleName={roleName} />
  );
}
