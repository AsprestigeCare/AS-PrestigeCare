"use client";

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wifi, WifiOff } from 'lucide-react';

// Service Worker registration and offline support
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  }
}

// Check if user is online
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Offline notification component
export function OfflineNotification() {
  const isOnline = useOnlineStatus();
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowOfflineMessage(true);
    } else {
      // Hide after coming back online
      const timer = setTimeout(() => setShowOfflineMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showOfflineMessage) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <Alert
        className={
          isOnline
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }
      >
        <div className="flex items-center">
          {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
          <AlertDescription className="ml-2">
            {isOnline
              ? 'Connexion rétablie !'
              : 'Mode hors ligne - Certaines fonctionnalités peuvent être limitées'}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}

// Cache management
export const cacheManager = {
  // Cache booking form data locally
  saveBookingDraft: (data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('booking_draft', JSON.stringify(data))
    }
  },

  getBookingDraft: () => {
    if (typeof window !== 'undefined') {
      const draft = localStorage.getItem('booking_draft')
      return draft ? JSON.parse(draft) : null
    }
    return null
  },

  clearBookingDraft: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('booking_draft')
    }
  },

  // Cache service data
  saveServices: (services: any[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('services_cache', JSON.stringify({
        data: services,
        timestamp: Date.now()
      }))
    }
  },

  getServices: () => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('services_cache')
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        // Cache valid for 1 hour
        if (Date.now() - timestamp < 3600000) {
          return data
        }
      }
    }
    return null
  }
}
