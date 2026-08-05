// src/core/notifications/notificationService.ts
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const DEFAULT_CHANNEL_ID = "default";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function ensureAndroidChannelAsync(): Promise<void> {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL_ID, {
    name: "Lembretes do GreenKeeper",
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
  });
}

export async function requestNotificationPermissionsAsync(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === "granted") {
    return true;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function initNotificationsAsync(): Promise<boolean> {
  await ensureAndroidChannelAsync();
  return requestNotificationPermissionsAsync();
}

interface ScheduleLocalNotificationInput {
  title: string;
  body?: string;
  secondsFromNow: number;
  data?: Record<string, unknown>;
}

export async function scheduleLocalNotificationAsync({
  title,
  body,
  secondsFromNow,
  data,
}: ScheduleLocalNotificationInput): Promise<string> {
  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: secondsFromNow,
      channelId: DEFAULT_CHANNEL_ID,
    },
  });
}