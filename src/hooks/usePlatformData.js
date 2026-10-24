import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS } from "../data/keys";
import {
  initialAnnouncements,
  initialCategories,
  initialContactMessages,
  initialPayouts,
  initialPlatformSettings,
  initialReviews,
  initialTickets,
  initialTransactions,
  initialUsers,
} from "../data/platformData";

// One small hook per data set, all saved in the browser.
export const useUsers = () => useLocalStorage(STORAGE_KEYS.users, initialUsers);
export const useTransactions = () => useLocalStorage(STORAGE_KEYS.transactions, initialTransactions);
export const usePayouts = () => useLocalStorage(STORAGE_KEYS.payouts, initialPayouts);
export const useReviews = () => useLocalStorage(STORAGE_KEYS.reviews, initialReviews);
export const useTickets = () => useLocalStorage(STORAGE_KEYS.tickets, initialTickets);
export const useAnnouncements = () => useLocalStorage(STORAGE_KEYS.announcements, initialAnnouncements);
export const useCategories = () => useLocalStorage(STORAGE_KEYS.categories, initialCategories);
export const usePlatformSettings = () => useLocalStorage(STORAGE_KEYS.platformSettings, initialPlatformSettings);
export const useContactMessages = () => useLocalStorage(STORAGE_KEYS.contactMessages, initialContactMessages);
