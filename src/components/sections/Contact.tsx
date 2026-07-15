import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Mail, MapPin, Phone, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormValidation } from '../../hooks/useFormValidation';
import { submitContact } from '../../services/api';
import toast from 'react-hot-toast';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Get in touch</h3>
            <p className="text-gray-400 mb-10 max-w-md leading-relaxed">
              I'm currently available for freelance projects and full-time opportunities.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'vinodsingh47928@gmail.com', color: 'text-cyan-400', bg: 'group-hover:bg-cyan-500/20' },
                { icon: Phone, label: 'Phone', value: '+91 8412968323', color: 'text-purple-400', bg: 'group-hover:bg-purple-500/20' },
                { icon: MapPin, label: 'Location', value: 'Mumbai, India', color: 'text-fuchsia-400', bg: 'group-hover:bg-fuchsia-500/20' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 group cursor-pointer">
                  <div className={`w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-colors duration-300 ${item.bg}`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">{item.label}</div>
                    <div className="text-white font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
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
                    className="flex flex-col items-center justify-center text-center py-12 h-full min-h-[400px]"
                  >
                    <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-3">Message Sent</h4>
                    <p className="text-gray-400 mb-8 max-w-sm">
                      Thank you for reaching out! I've received your message and will get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setSubmitStatus('idle')}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : submitStatus === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-12 h-full min-h-[400px]"
                  >
                    <div className="w-20 h-20 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                      <XCircle className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-3">Delivery Failed</h4>
                    <p className="text-gray-400 mb-8 max-w-sm">
                      There was a problem sending your message. Please try again later or contact me directly via email.
                    </p>
                    <Button
                      onClick={() => setSubmitStatus('idle')}
                      variant="outline"
                    >
                      Try Again
                    </Button>
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
                      <Input
                        id="name"
                        label="Your Name"
                        value={values.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        error={touched.name ? errors.name : undefined}
                        disabled={isSubmitting}
                      />
                      <Input
                        id="email"
                        type="email"
                        label="Your Email"
                        value={values.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        error={touched.email ? errors.email : undefined}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="mt-8">
                      <Input
                        id="subject"
                        label="Subject"
                        value={values.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        onBlur={() => handleBlur('subject')}
                        error={touched.subject ? errors.subject : undefined}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="mt-8 relative">
                      <Textarea
                        id="message"
                        rows={5}
                        label="Message"
                        value={values.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        error={touched.message ? errors.message : undefined}
                        disabled={isSubmitting}
                      />
                      <div className="absolute right-2 bottom-8 text-xs text-gray-500 font-medium">
                        <span className={values.message.length > 1000 ? 'text-red-400' : ''}>
                          {values.message.length}
                        </span>
                        /1000
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-full mt-6 py-4"
                      isLoading={isSubmitting}
                    >
                      {!isSubmitting && (
                        <>
                          Send Message <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </Button>
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
