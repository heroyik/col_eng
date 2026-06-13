import { getStorageItem, hasLocalStorage, removeStorageItem, setStorageItem } from "./storage";

export type ReminderStatus = "unsupported" | "default" | "granted" | "denied";

const REMINDER_OPT_IN_KEY = "col_eng_learning_reminders_opt_in";
const REMINDER_LAST_DUE_NOTICE_KEY = "col_eng_learning_reminders_last_due_notice";

export function getReminderStatus(): ReminderStatus {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}

export function isLearningReminderEnabled(): boolean {
  return hasLocalStorage() && getStorageItem(REMINDER_OPT_IN_KEY) === "true";
}

export function setLearningReminderEnabled(enabled: boolean): void {
  if (!hasLocalStorage()) return;
  if (enabled) {
    setStorageItem(REMINDER_OPT_IN_KEY, "true");
  } else {
    removeStorageItem(REMINDER_OPT_IN_KEY);
  }
}

export async function requestLearningReminderPermission(): Promise<ReminderStatus> {
  if (getReminderStatus() === "unsupported") return "unsupported";
  return Notification.requestPermission();
}

export function showLearningReminderPreview(): void {
  if (getReminderStatus() !== "granted") return;
  new Notification("Colloquial English", {
    body: "A quick review is ready when you are.",
    tag: "col-eng-learning-reminder",
  });
}

export function showDueLearningReminder(dueCount: number, now = new Date()): boolean {
  if (dueCount <= 0 || getReminderStatus() !== "granted" || !isLearningReminderEnabled()) {
    return false;
  }

  const today = dateKey(now);
  if (hasLocalStorage() && getStorageItem(REMINDER_LAST_DUE_NOTICE_KEY) === today) {
    return false;
  }

  new Notification("Colloquial English", {
    body: dueCount === 1
      ? "1 review card is ready."
      : `${dueCount} review cards are ready.`,
    tag: "col-eng-learning-due-reminder",
  });

  if (hasLocalStorage()) {
    setStorageItem(REMINDER_LAST_DUE_NOTICE_KEY, today);
  }

  return true;
}

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}
