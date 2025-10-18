'use client';

import ItemTemplateLayout from "@/helpers/components/layouts/templates/item";
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
    <ItemTemplateLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">参加者詳細一覧</h2>
        <p className="text-slate-600 text-lg">スケジュールごとの参加状況</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-4 px-6 font-bold uppercase text-sm text-slate-700 border-b border-slate-200">ユーザー</th>
                <th className="py-4 px-6 font-bold uppercase text-sm text-slate-700 border-b border-slate-200">役割</th>
                <th className="py-4 px-6 font-bold uppercase text-sm text-slate-700 border-b border-slate-200">スケジュール</th>
                <th className="py-4 px-6 font-bold uppercase text-sm text-slate-700 border-b border-slate-200">ステータス</th>
                <th className="py-4 px-6 font-bold uppercase text-sm text-slate-700 border-b border-slate-200">支払い</th>
                <th className="py-4 px-6 font-bold uppercase text-sm text-slate-700 border-b border-slate-200">出欠</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {participantRows.map((row, index) => (
                <tr key={`${row.userEmail}-${row.scheduleId}`} className="hover:bg-slate-50">
                  <td className="py-4 px-6 border-b border-slate-200 font-medium">{row.userEmail}</td>
                  <td className="py-4 px-6 border-b border-slate-200">
                    {row.isOrganizer ? <StatusBadge color="purple">主催者</StatusBadge> : <span className="text-slate-600">参加者</span>}
                  </td>
                  <td className="py-4 px-6 border-b border-slate-200 font-semibold text-slate-900">{row.scheduleTitle}</td>
                  <td className="py-4 px-6 border-b border-slate-200">
                    <StatusBadge color={row.isCancelled ? "gray" : "blue"}>
                      {row.isCancelled ? "キャンセル" : "参加中"}
                    </StatusBadge>
                  </td>
                  <td className="py-4 px-6 border-b border-slate-200">
                    {row.hasPaid ? <StatusBadge color="teal">済</StatusBadge> : <span className="text-slate-500">未</span>}
                  </td>
                  <td className="py-4 px-6 border-b border-slate-200">
                    {row.hasAttended ? <StatusBadge color="green">済</StatusBadge> : <span className="text-slate-500">未</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ItemTemplateLayout>
  );
}
