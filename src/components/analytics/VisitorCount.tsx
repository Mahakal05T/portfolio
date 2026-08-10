import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { getVisitorCount } from '../../services/api';

interface VisitorCountProps {
  className?: string;
}

export const VisitorCount = ({ className = '' }: VisitorCountProps) => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getVisitorCount()
      .then((data) => {
        if (isMounted && typeof data?.count === 'number') {
          setCount(data.count);
        }
      })
      .catch((err) => {
        console.error('[VisitorCount] Failed to fetch visitor count:', err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400 font-light ${className}`}>
        <Eye className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Loading visitors...</span>
      </div>
    );
  }

  if (count === null) {
    return null; // Graceful fallback if backend API is unavailable
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300 font-light transition-colors hover:border-cyan-500/30 hover:bg-white/10 ${className}`}>
      <Eye className="w-3.5 h-3.5 text-cyan-400" />
      <span className="font-medium text-gray-200">{count.toLocaleString()}</span>
      <span className="text-gray-400">Visitors</span>
    </div>
  );
};
