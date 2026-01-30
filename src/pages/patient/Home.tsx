import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Stethoscope, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-600 to-teal-500 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />

        <div className="relative container mx-auto max-w-7xl px-6 py-24 lg:py-36 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-6 text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Smart Healthcare,
              <br /> Simplified.
            </h1>

            <p className="text-lg text-white/90 max-w-xl">
              Book appointments with trusted doctors, manage your health,
              and access care effortlessly.
            </p>

            <div className="flex gap-4 pt-4">
              <Link to="/doctors">
                <Button
                  size="lg"
                  className="h-12 px-8 text-lg bg-white text-blue-700 hover:bg-white/90 shadow-lg hover:shadow-xl transition"
                >
                  Book Appointment
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-lg border-white text-white hover:bg-white hover:text-blue-700 transition"
                >
                  Patient Login
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src="/hero.png"
              alt="Clinic Illustration"
              className="w-full max-w-md drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold tracking-tight text-blue-800">
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground mt-2">
            Designed for your convenience and health.
          </p>
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Calendar />}
            title="Easy Scheduling"
            description="Select your preferred date and time instantly."
            delay={0}
          />
          <FeatureCard
            icon={<Stethoscope />}
            title="Expert Doctors"
            description="Verified specialists for all your needs."
            delay={0.1}
          />
          <FeatureCard
            icon={<Clock />}
            title="Zero Wait Time"
            description="Book in advance and skip the queue."
            delay={0.2}
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Secure Records"
            description="Your medical history is safe with us."
            delay={0.3}
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 to-teal-500 px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl"
        >
          <div>
            <h2 className="text-3xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="text-white/90 mt-2">
              Find the right doctor for you today.
            </p>
          </div>

          <Link to="/doctors">
            <Button
              size="lg"
              className="h-12 px-10 text-lg font-semibold bg-white text-blue-700 hover:bg-white/90 shadow-md hover:scale-105 transition"
            >
              Find a Doctor
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
    >
      <Card className="group text-center border-none bg-white shadow-md hover:shadow-xl transition rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-4 pb-2">
          <div className="rounded-full bg-blue-50 p-4 group-hover:bg-blue-100 transition">
            {React.cloneElement(icon as React.ReactElement, {
              className:
                "h-10 w-10 text-blue-600 group-hover:scale-110 transition",
            })}
          </div>
          <CardTitle className="text-xl text-blue-800">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
