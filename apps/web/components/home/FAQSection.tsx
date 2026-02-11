'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
    const faqs = [
        {
            question: "Are the doctors on MediConnect verified?",
            answer: "Yes. Every doctor listed on MediConnect undergoes a strict verification process. We verify their medical license, qualifications, and good standing with medical boards before they can accept appointments."
        },
        {
            question: "How much does it cost to book an appointment?",
            answer: "MediConnect is free for patients to use. You only pay for the consultation fee which is set by the doctor. The fee is clearly displayed before you book."
        },
        {
            question: "Can I cancel or reschedule my appointment?",
            answer: "Yes, you can cancel or reschedule up to 24 hours before your appointment time for a full refund. Cancellations within 24 hours may be subject to a fee depending on the doctor's policy."
        },
        {
            question: "Do you offer video consultations?",
            answer: "Absolutely. Many doctors on our platform offer secure video consultations. Just look for the 'Video Consult' badge/icon when searching for a specialist."
        },
        {
            question: "Is my health data secure?",
            answer: "Your privacy is our top priority. All personal health information is encrypted and stored securely in compliance with healthcare data protection standards."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-200"
                        >
                            <button
                                className="w-full flex items-center justify-between p-5 text-left bg-white focus:outline-none"
                                onClick={() => setOpenIndex(prev => prev === index ? null : index)}
                            >
                                <span className="font-semibold text-slate-900">{faq.question}</span>
                                <ChevronDown
                                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`
                                    overflow-hidden transition-all duration-300 ease-in-out
                                    ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                                `}
                            >
                                <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-transparent">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
