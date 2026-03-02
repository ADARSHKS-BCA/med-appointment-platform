'use client';
import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

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
            answer: "Absolutely. Many doctors on our platform offer secure video consultations. Just look for the 'Video Consult' badge when searching for a specialist."
        },
        {
            question: "Is my health data secure?",
            answer: "Your privacy is our top priority. All personal health information is encrypted and stored securely in compliance with healthcare data protection standards."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-100/20 rounded-full blur-[120px]" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <MessageCircleQuestion className="h-4 w-4" />
                        FAQ
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 mt-3">Everything you need to know about MediConnect.</p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-premium ring-1 ring-indigo-100' : 'hover:shadow-md'
                                    }`}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none group"
                                    onClick={() => setOpenIndex(prev => prev === index ? null : index)}
                                >
                                    <span className={`font-semibold pr-4 transition-colors ${isOpen ? 'text-indigo-700' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-100 rotate-180' : 'bg-slate-100 group-hover:bg-indigo-50'
                                        }`}>
                                        <ChevronDown className={`h-4 w-4 transition-colors ${isOpen ? 'text-indigo-600' : 'text-slate-400'}`} />
                                    </div>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-500 leading-relaxed border-t border-slate-100/50 pt-4">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
