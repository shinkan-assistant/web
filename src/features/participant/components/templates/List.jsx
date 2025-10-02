'use client';

import ItemContainer from "@/helpers/components/layouts/templates/item";
import StatusBadge from "../contents/statusBadge";

// ヘルパー関数: 「参加者×スケジュール」の単位で表示用データを作成する
const createParticipantScheduleRows = (participants, event, users) => {
  const rows = [];
  
  const eventParticipants = participants.filter(p => p["event_id"] === event["id"]);
  
  for (const participant of eventParticipants) {
    const user = users.find(user => user["email"] === participant["user_email"]);
    if (participant.schedules.length === 0) {
      // スケジュールに参加していない場合も、行として情報を追加することが考えられる
      // 今回はスケジュール参加者のみを対象とする
      continue;
    }

    for (const schedule of participant.schedules) {
      const scheduleInfo = event.schedules.find(s => s.id === schedule.id);

      rows.push({
        // ユーザー情報（毎行同じデータが入る）
        userEmail: user["email"],
        isOrganizer: participant.is_organizer,
        // スケジュールごとの情報
        scheduleId: schedule.id,
        scheduleTitle: scheduleInfo?.title || "不明なスケジュール",
        isCancelled: !!schedule.cancel,
        hasAttended: !!schedule.attendance,
        hasPaid: !!schedule.payment,
        paymentMethod: schedule.payment?.method || "--",
      });
    }
  }
  return rows;
};

export default function ParticipantListTemplate({participants, event, users}) {
  const participantRows = createParticipantScheduleRows(participants, event, users);

  return (
    <ItemContainer>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">参加者詳細一覧</h2>
        <p className="text-gray-600">スケジュールごとの参加状況</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">ユーザー</th>
              <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">役割</th>
              <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">スケジュール</th>
              <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">ステータス</th>
              <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">支払い</th>
              <th className="py-3 px-4 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">出欠</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {participantRows.map((row, index) => (
              <tr key={`${row.userEmail}-${row.scheduleId}`} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">{row.userEmail}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {row.isOrganizer ? <StatusBadge color="purple">主催者</StatusBadge> : "参加者"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 font-semibold">{row.scheduleTitle}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <StatusBadge color={row.isCancelled ? "gray" : "blue"}>
                    {row.isCancelled ? "キャンセル" : "参加中"}
                  </StatusBadge>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {row.hasPaid ? <StatusBadge color="teal">済</StatusBadge> : "未"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {row.hasAttended ? <StatusBadge color="green">済</StatusBadge> : "未"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ItemContainer>
  );
}
