"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/navbar";
import ObjectParticles from "@/components/backgrounds/object-particles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactMethods = [
  {
    icon: <Mail className="w-5 h-5 text-blue-500" />,
    title: "Email Us",
    desc: "Send us an email anytime",
    contact: "abdallahemad800@gmail.com",
    action: "mailto:abdallahemad800@gmail.com",
  },
  {
    icon: <Phone className="w-5 h-5 text-green-500" />,
    title: "Call Us",
    desc: "Mon–Fri from 9 am to 6 pm",
    contact: "+20 111 655 5793",
    action: "tel:+971 56 143 2193",
  },
  {
    icon: <MapPin className="w-5 h-5 text-red-500" />,
    title: "Visit Us",
    desc: "Come say hello at our office",
    contact: "Ajman, United Arab Emirates",
    action: "https://maps.app.goo.gl/QJr5aqY6SHn1TmZ56",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSub] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSub(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSub(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <main className="relative min-h-screen text-white">
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 pointer-events-none" />
      </div>

      <Navbar />

      <section className="pt-32 pb-16 relative z-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Let’s bring your ideas to life. We’re always happy to hear from you.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/60 backdrop-blur p-6 rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-xl">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400">
                      We’ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        className="bg-gray-800 text-white"
                        name="name"
                        required
                        placeholder="Full name"
                        value={form.name}
                        onChange={onChange}
                      />
                      <Input
                        className="bg-gray-800 text-white"
                        name="email"
                        required
                        placeholder="Email"
                        value={form.email}
                        onChange={onChange}
                      />
                    </div>
                    <Input
                      className="bg-gray-800 text-white"
                      name="subject"
                      required
                      placeholder="Subject"
                      value={form.subject}
                      onChange={onChange}
                    />
                    <Textarea
                      className="bg-gray-800 text-white"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us about your project…"
                      value={form.message}
                      onChange={onChange}
                    />
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {submitting ? (
                        "Sending…"
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {contactMethods.map(({ icon, title, desc, contact, action }) => (
              <Card
                key={title}
                className="bg-gray-900/50 backdrop-blur p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <CardContent className="flex items-start space-x-4">
                  <div className="p-2 bg-white rounded-full">{icon}</div>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="text-sm text-gray-300">{desc}</p>
                    <a
                      href={action}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {contact}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-gray-800 p-4 rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock size={18} className="mr-2" /> Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <span>Mon‑Fri</span>
                  <span>9 am – 6 pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10 am – 4 pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
