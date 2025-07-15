"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

/* ------------------------------------------------------------------ */
/* helper data                                                        */
const contactMethods = [
  {
    icon: <Mail className="w-6 h-6 text-blue-600" />,
    title: "Email Us",
    desc: "Send us an email anytime",
    contact: "hello@swagifyy.com",
    action: "mailto:hello@swagifyy.com",
  },
  {
    icon: <Phone className="w-6 h-6 text-green-600" />,
    title: "Call Us",
    desc: "Mon‑Fri from 9 am to 6 pm",
    contact: "+1 (555) 123‑4567",
    action: "tel:+15551234567",
  },
  {
    icon: <MapPin className="w-6 h-6 text-red-600" />,
    title: "Visit Us",
    desc: "Come say hello at our office",
    contact: "123 Business St, New York, NY 10001",
    action: "https://maps.google.com",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
    title: "Live Chat",
    desc: "Chat with our team",
    contact: "Available 24/7",
    action: "#",
  },
];

const faqs = [
  {
    q: "What's your typical turnaround time?",
    a: "Most custom products are completed within 7‑14 business days, depending on complexity and quantity.",
  },
  {
    q: "Do you offer bulk discounts?",
    a: "Yes! We offer competitive pricing for bulk orders. Contact us for a custom quote based on your needs.",
  },
  {
    q: "Can I see a sample before placing a large order?",
    a: "We can provide samples for most products. Sample costs are often credited toward your final order.",
  },
  {
    q: "What file formats do you accept for designs?",
    a: "We accept AI, EPS, PDF, PNG, and JPG files. For best results, vector files (AI, EPS) are preferred.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide! Shipping costs and delivery times vary by location. Contact us for specific rates.",
  },
];

/* ------------------------------------------------------------------ */
export default function ContactPage() {
  /* form state ----------------------------------------------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSub] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSub(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate API
    setSub(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  /* render --------------------------------------------------------- */
  return (
    <main className="relative min-h-screen to-purple-600">
      {/* background */}
      <div className="fixed inset-0 z-0">
        <ObjectParticles count={40} background="#111827" />
        <div className="absolute inset-0 bg-gradient-to-b to-purple-600 via-transparent to-gray-900/70 pointer-events-none" />
      </div>

      <Navbar />

      {/* back‑to‑home header bar */}
      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center to-purple-600 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold ml-auto">Contact Us</h1>
        </div>
      </div>

      {/* hero */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg to-purple-600 ">
            Ready to bring your brand to life? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* -------------------- form -------------------- */}
          <div className="lg:col-span-2">
            <Card className="to-purple-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">
                      Message Sent!
                    </h3>
                    <p className="to-purple-600">
                      We’ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        name="name"
                        required
                        placeholder="Full name"
                        value={form.name}
                        onChange={onChange}
                      />
                      <Input
                        name="email"
                        required
                        placeholder="Email"
                        value={form.email}
                        onChange={onChange}
                      />
                    </div>
                    <Input
                      name="subject"
                      required
                      placeholder="Subject"
                      value={form.subject}
                      onChange={onChange}
                    />
                    <Textarea
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

          {/* -------------------- contact cards -------------------- */}
          <div className="space-y-8">
            {contactMethods.map(({ icon, title, desc, contact, action }) => (
              <Card
                key={title}
                className="to-purple-600 backdrop-blur-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 flex items-start space-x-4">
                  {icon}
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-300">{desc}</p>
                    <a
                      href={action}
                      className="text-primary hover:underline text-sm"
                    >
                      {contact}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="to-purple-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock size={18} className="mr-2" /> Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
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

        {/* -------------------- FAQ -------------------- */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map(({ q, a }) => (
              <Card
                key={q}
                className="to-purple-600 backdrop-blur-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">{q}</h3>
                  <p className="text-gray-300">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* -------------------- CTA -------------------- */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-blue-100 mb-8">
              Don't hesitate to reach out. We're here to help.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Schedule a Call
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
