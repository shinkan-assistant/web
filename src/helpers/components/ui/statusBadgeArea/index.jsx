import StatusBadge from "../statusBadge";

export default function StatusBadgeList({statuses, disabled}) {
  if (statuses.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map(status => (
        <StatusBadge key={status.fieldName} status={status} disabled={disabled} />
      ))}
    </div>
  );
}
