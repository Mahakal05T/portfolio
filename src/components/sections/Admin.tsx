import { useState, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Shield, Mail, Trash2, CheckCircle, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

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
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          )}
        </div>

        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <GlassCard className="p-8 border-white/5 shadow-2xl shadow-purple-500/10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10 shadow-lg">
                  <Shield className="w-10 h-10 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-8">Admin Access</h3>
              <form onSubmit={handleLogin} className="space-y-6">
                <Input
                  id="apiKey"
                  type="password"
                  label="Enter API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full py-3 text-base"
                >
                  Authenticate
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-0 overflow-hidden border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-gray-400 text-sm uppercase tracking-wider font-semibold">
                      <th className="py-5 px-6">Status</th>
                      <th className="py-5 px-6">Date</th>
                      <th className="py-5 px-6">Name & Email</th>
                      <th className="py-5 px-6">Message</th>
                      <th className="py-5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            Loading secure messages...
                          </div>
                        </td>
                      </tr>
                    ) : messages.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-gray-400">
                          <Mail className="w-16 h-16 mx-auto mb-4 opacity-20" />
                          <p className="text-lg">Inbox is empty</p>
                        </td>
                      </tr>
                    ) : (
                      messages.map((msg) => (
                        <tr key={msg.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                          <td className="py-5 px-6">
                            <button
                              onClick={() => updateStatus(msg.id, msg.status)}
                              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                                msg.status === 'Unread' 
                                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              {msg.status}
                            </button>
                          </td>
                          <td className="py-5 px-6 text-sm text-gray-400 whitespace-nowrap font-light">
                            {new Date(msg.created_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="py-5 px-6">
                            <div className="text-white font-medium mb-1">{msg.name}</div>
                            <div className="text-sm text-gray-500">{msg.email}</div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="text-sm text-white font-medium mb-1">{msg.subject}</div>
                            <div className="text-sm text-gray-400 line-clamp-2 max-w-lg font-light leading-relaxed">{msg.message}</div>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
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
