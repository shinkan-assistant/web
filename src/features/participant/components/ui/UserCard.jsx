'use client';

import StatusBadge from "./StatusBadge";

const ScheduleDetail = ({ schedule, event }) => {
  const hasAttended = !!schedule.attendance;
  const hasPaid = !!schedule.payment;
  const hasCancelled = !!schedule.cancel;

  // イベントデータから対応するスケジュールの詳細（タイトル）を検索
  const scheduleInfo = event.schedules.find(s => s.id === schedule.id);
  const title = scheduleInfo ? scheduleInfo.title : "不明なスケジュール";

  let status = { text: "参加中", color: "blue" };
  if (hasCancelled) {
    status = { text: "キャンセル", color: "gray" };
  } else if (hasAttended) {
    status = { text: "出席済み", color: "green" };
  }

  return (
    <div className="p-3 bg-gray-50 rounded-md mt-2 border border-gray-200">
      <div className="flex justify-between items-center">
        <p className="text-base font-semibold text-gray-800 truncate">{title}</p>
        <StatusBadge color={status.color}>{status.text}</StatusBadge>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-2">
        {hasPaid && <StatusBadge color="teal">支払い済み</StatusBadge>}
        {schedule.payment?.method && <span className="text-xs text-gray-500">({schedule.payment.method})</span>}
      </div>
    </div>
  );
};

export default function UserCard({ event, participant, user }) {
  // 参加者のevent_idから対応するイベント情報を検索
  // イベントが見つからない場合は何も表示しない（エラーハンドリング）
  if (!event) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xl font-bold text-gray-900">{user["email"]}</p>
        </div>
        {participant.is_organizer && (
          <StatusBadge color="purple">主催者</StatusBadge>
        )}
      </div>

      <div>
        <h4 className="font-semibold text-gray-700">参加スケジュール</h4>
        <div className="mt-2 space-y-2">
          {participant.schedules.map(schedule => (
            <ScheduleDetail key={schedule.id} schedule={schedule} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
