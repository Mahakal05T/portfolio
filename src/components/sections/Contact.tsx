import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Mail, MapPin, Phone, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormValidation } from '../../hooks/useFormValidation';
import { submitContact } from '../../services/api';
import toast from 'react-hot-toast';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  } = useFormValidation(
    {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    {
      name: [
        { validate: (v) => v.length >= 3, message: 'Name must be at least 3 characters' },
        { validate: (v) => v.length <= 80, message: 'Name must be less than 80 characters' },
      ],
      email: [
        { validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Please enter a valid email' },
      ],
      subject: [
        { validate: (v) => v.length > 0, message: 'Subject is required' },
        { validate: (v) => v.length <= 120, message: 'Subject must be less than 120 characters' },
      ],
      message: [
        { validate: (v) => v.trim().length >= 20, message: 'Message must be at least 20 characters' },
        { validate: (v) => v.length <= 1000, message: 'Message must be less than 1000 characters' },
      ],
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitContact(values);
      setSubmitStatus('success');
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      const axiosError = error as { response?: { data?: { error?: string } } };
      const errorMessage = axiosError.response?.data?.error || 'Failed to send message. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Let's Connect"
          subtitle="Have a project in mind? Let's build something amazing together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Get in touch</h3>
            <p className="text-gray-400 mb-10 max-w-md">
              I'm currently available for freelance projects and full-time opportunities.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-white font-medium">vinodsingh47928@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="text-white font-medium">+91 8412968323</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="text-white font-medium">Mumbai, India</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <GlassCard className="p-8 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Message Sent Successfully</h4>
                    <p className="text-gray-400 mb-8">
                      Thank you for contacting me.
                      <br />
                      I will get back to you soon.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : submitStatus === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-6">
                      <XCircle className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Unable to send message</h4>
                    <p className="text-gray-400 mb-8">
                      There was a problem sending your message.
                      <br />
                      Please try again later.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
                    >
                      Try Again
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group/input">
                        <input
                          type="text"
                          id="name"
                          value={values.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          className={`peer w-full bg-black/20 border ${touched.name && errors.name ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-purple-500 focus:ring-purple-500'
                            } rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:ring-1 transition-colors placeholder-transparent disabled:opacity-50`}
                          placeholder="Ayush Singh"
                          disabled={isSubmitting}
                        />
                        <label htmlFor="name" className={`absolute left-4 top-2 text-xs font-medium ${touched.name && errors.name ? 'text-red-400' : 'text-purple-400 peer-focus:text-purple-400'
                          } peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs transition-all`}>
                          Your Name
                        </label>
                        {touched.name && errors.name && (
                          <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{errors.name}</p>
                        )}
                      </div>

                      <div className="relative group/input">
                        <input
                          type="email"
                          id="email"
                          value={values.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          className={`peer w-full bg-black/20 border ${touched.email && errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-cyan-500 focus:ring-cyan-500'
                            } rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:ring-1 transition-colors placeholder-transparent disabled:opacity-50`}
                          placeholder="info@singhworks.com"
                          disabled={isSubmitting}
                        />
                        <label htmlFor="email" className={`absolute left-4 top-2 text-xs font-medium ${touched.email && errors.email ? 'text-red-400' : 'text-cyan-400 peer-focus:text-cyan-400'
                          } peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs transition-all`}>
                          Your Email
                        </label>
                        {touched.email && errors.email && (
                          <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="relative group/input mt-8">
                      <input
                        type="text"
                        id="subject"
                        value={values.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        onBlur={() => handleBlur('subject')}
                        className={`peer w-full bg-black/20 border ${touched.subject && errors.subject ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-purple-500 focus:ring-purple-500'
                          } rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:ring-1 transition-colors placeholder-transparent disabled:opacity-50`}
                        placeholder="Project Inquiry"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="subject" className={`absolute left-4 top-2 text-xs font-medium ${touched.subject && errors.subject ? 'text-red-400' : 'text-purple-400 peer-focus:text-purple-400'
                        } peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs transition-all`}>
                        Subject
                      </label>
                      {touched.subject && errors.subject && (
                        <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{errors.subject}</p>
                      )}
                    </div>

                    <div className="relative group/input mt-8 pb-4">
                      <textarea
                        id="message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        className={`peer w-full bg-black/20 border ${touched.message && errors.message ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-cyan-500 focus:ring-cyan-500'
                          } rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:ring-1 transition-colors resize-none placeholder-transparent disabled:opacity-50`}
                        placeholder="Tell me about your project..."
                        disabled={isSubmitting}
                      />
                      <label htmlFor="message" className={`absolute left-4 top-2 text-xs font-medium ${touched.message && errors.message ? 'text-red-400' : 'text-cyan-400 peer-focus:text-cyan-400'
                        } peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs transition-all`}>
                        Message
                      </label>
                      <div className="absolute right-2 bottom-6 text-xs text-gray-500">
                        <span className={values.message.length > 1000 ? 'text-red-400' : ''}>
                          {values.message.length}
                        </span>
                        /1000
                      </div>
                      {touched.message && errors.message && (
                        <p className="text-red-400 text-xs mt-1 absolute bottom-0">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      disabled={isSubmitting}
                      className="w-full py-4 flex items-center justify-center gap-2 bg-primary-gradient text-white rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition-all overflow-hidden relative group/btn disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    >
                      {!isSubmitting && (
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send className="w-4 h-4 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
