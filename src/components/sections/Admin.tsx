import { useState, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Shield, Mail, Trash2, CheckCircle, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Archived';
  created_at: string;
}

export const Admin = () => {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('adminApiKey') || '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('adminApiKey'));
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch messages when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      toast.error('Please enter an API key');
      return;
    }
    localStorage.setItem('adminApiKey', apiKey);
    setIsAuthenticated(true);
    toast.success('Logged in successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminApiKey');
    setApiKey('');
    setIsAuthenticated(false);
    setMessages([]);
    toast.success('Logged out');
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      // We assume Vite is proxying /api to backend (or Vercel routing handles it)
      const res = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (res.status === 401) {
        toast.error('Invalid API Key');
        handleLogout();
        return;
      }
      
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      setMessages(data.messages);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Unread' ? 'Read' : 'Unread';
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) throw new Error('Failed to update');
      
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
      toast.success(`Marked as ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to delete');
      
      setMessages(messages.filter(m => m.id !== id));
      toast.success('Message deleted');
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen relative z-10" id="admin">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <SectionHeading title="Admin Dashboard" subtitle="Manage your contact messages" />
          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>

        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <GlassCard className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-6">Admin Login</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="Enter ADMIN_API_KEY"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/25"
                >
                  Access Dashboard
                </button>
              </form>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-sm">
                      <th className="py-4 px-4 font-medium">Status</th>
                      <th className="py-4 px-4 font-medium">Date</th>
                      <th className="py-4 px-4 font-medium">Name & Email</th>
                      <th className="py-4 px-4 font-medium">Message</th>
                      <th className="py-4 px-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            Loading messages...
                          </div>
                        </td>
                      </tr>
                    ) : messages.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-400">
                          <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
                          No messages found.
                        </td>
                      </tr>
                    ) : (
                      messages.map((msg) => (
                        <tr key={msg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="py-4 px-4">
                            <button
                              onClick={() => updateStatus(msg.id, msg.status)}
                              className={`flex items-center gap-2 text-xs px-2 py-1 rounded-full ${
                                msg.status === 'Unread' 
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                              }`}
                            >
                              {msg.status === 'Unread' ? <CheckCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                              {msg.status}
                            </button>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-400 whitespace-nowrap">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white font-medium">{msg.name}</div>
                            <div className="text-sm text-gray-500">{msg.email}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-300 font-medium mb-1">{msg.subject}</div>
                            <div className="text-sm text-gray-400 line-clamp-2 max-w-md">{msg.message}</div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              title="Delete Message"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </section>
  );
};
