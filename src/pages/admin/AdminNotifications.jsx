import { useMemo } from "react";

const AdminNotifications = () => {
  const items = useMemo(
    () => [
      {
        id: 1,
        title: "Notice Title",
        body:
          "Right Here In This Place Is Written The Long Text Of The Notification Sent To The Control Panel User.",
      },
      {
        id: 2,
        title: "Notice Title",
        body:
          "Right Here In This Place Is Written The Long Text Of The Notification Sent To The Control Panel User.",
      },
      {
        id: 3,
        title: "Notice Title",
        body:
          "Right Here In This Place Is Written The Long Text Of The Notification Sent To The Control Panel User.",
      },
    ],
    []
  );

  return (
    <div className="space-y-5">
      <h1 className="text-text-primary text-xl font-semibold">Notifications</h1>

      <div className="bg-background-white rounded-2xl shadow-card overflow-hidden">
        {items.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-4 px-6 py-5 border-b border-border-light last:border-b-0"
          >
            <div className="w-12 h-12 rounded-full bg-background-primary flex items-center justify-center">
              🔔
            </div>
            <div>
              <div className="text-text-primary font-semibold">{n.title}</div>
              <div className="text-text-secondary text-sm">{n.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;

