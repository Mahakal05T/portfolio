import { useEffect, useRef } from 'react';
import { registerVisitor } from '../../services/api';

const VISITOR_KEY = 'visitor_id';

/**
 * Generate a secure unique identifier using crypto.randomUUID with fallback
 */
function generateVisitorId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for environments lacking crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const VisitorTracker = () => {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;

    try {
      let visitorId = localStorage.getItem(VISITOR_KEY);
      if (!visitorId) {
        visitorId = generateVisitorId();
        localStorage.setItem(VISITOR_KEY, visitorId);

        registerVisitor(visitorId).catch((err) => {
          console.error('[VisitorTracker] Failed to register new visitor:', err);
        });
      }
    } catch (err) {
      console.error('[VisitorTracker] Error initializing visitor tracking:', err);
    }
  }, []);

  return null;
};
