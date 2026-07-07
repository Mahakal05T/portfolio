import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
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
          >
            <GlassCard className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      placeholder="Ayush Singh"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      placeholder="info@singhworks.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button variant="primary" className="w-full py-4 flex items-center justify-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
