import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Activity, FileText, Pill, Clock, FileWarning, Paperclip } from 'lucide-react';

interface PatientQuickAccessDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patientId?: string; // Will fetch real data based on this later
}

export function PatientQuickAccessDrawer({ open, onOpenChange, patientId }: PatientQuickAccessDrawerProps) {
    // Mock Data
    const patient = {
        name: 'Sarah Smith',
        age: 34,
        gender: 'Female',
        bloodGroup: 'O+',
        phone: '+91 98765 43210',
        email: 'sarah.smith@example.com',
        allergies: ['Penicillin', 'Peanuts'],
        currentMeds: ['Atorvastatin 20mg', 'Metformin 500mg'],
        medicalHistory: [
            'Type 2 Diabetes (Diagnosed 2021)',
            'Hypertension (Diagnosed 2022)'
        ],
        pastVisits: [
            { date: '12 Jan 2024', reason: 'Routine Checkup', doctor: 'Dr. Jane Doe' },
            { date: '05 Nov 2023', reason: 'Fever and Cough', doctor: 'Dr. Jane Doe' },
        ],
        labReports: [
            { date: '15 Jan 2024', name: 'HbA1c & Fasting Glucose' },
            { date: '10 Nov 2023', name: 'Complete Blood Count' }
        ]
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-0 flex flex-col h-full bg-slate-50 border-l-0 shadow-2xl">
                <SheetHeader className="p-6 pb-4 bg-white border-b border-slate-100">
                    <SheetTitle className="flex items-center gap-3 text-xl">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                            <User size={20} />
                        </div>
                        <div>
                            {patient.name}
                            <span className="block text-sm font-normal text-slate-500 mt-1">
                                {patient.age} Yrs • {patient.gender} • {patient.bloodGroup}
                            </span>
                        </div>
                    </SheetTitle>
                    <SheetDescription className="hidden">
                        Quick access to patient history and details.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-8">
                        {/* Allergies - Critical Warning */}
                        {patient.allergies && patient.allergies.length > 0 && (
                            <section>
                                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                    <FileWarning className="w-4 h-4 text-red-500" />
                                    Allergies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.map((allergy, i) => (
                                        <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200 uppercase tracking-wider text-xs font-bold py-1">
                                            {allergy}
                                        </Badge>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Current Medications */}
                        <section>
                            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <Pill className="w-4 h-4 text-purple-500" />
                                Current Medications
                            </h3>
                            <ul className="space-y-2">
                                {patient.currentMeds.map((med, i) => (
                                    <li key={i} className="bg-white px-3 py-2 rounded-md border border-slate-200 text-sm text-slate-700 shadow-sm">
                                        {med}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Medical History */}
                        <section>
                            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-rose-500" />
                                Medical History
                            </h3>
                            <ul className="space-y-2">
                                {patient.medicalHistory.map((hist, i) => (
                                    <li key={i} className="bg-white px-3 py-2 rounded-md border border-slate-200 text-sm text-slate-700 shadow-sm">
                                        {hist}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Past Visits */}
                        <section>
                            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-500" />
                                Past Visits
                            </h3>
                            <div className="space-y-3">
                                {patient.pastVisits.map((visit, i) => (
                                    <div key={i} className="bg-white p-3 rounded-md border border-slate-200 shadow-sm relative pl-4 overflow-hidden group">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 group-hover:w-1.5 transition-all"></div>
                                        <p className="text-sm font-medium text-slate-800 font-semibold">{visit.date}</p>
                                        <p className="text-xs text-slate-500 mt-1">{visit.reason} • {visit.doctor}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Lab Reports */}
                        <section>
                            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-emerald-500" />
                                Lab Reports
                            </h3>
                            <div className="space-y-2">
                                {patient.labReports.map((report, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white px-3 py-2.5 rounded-md border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                        <div>
                                            <p className="text-sm text-slate-800 font-medium">{report.name}</p>
                                            <p className="text-xs text-slate-500">{report.date}</p>
                                        </div>
                                        <Paperclip className="w-4 h-4 text-slate-400" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </ScrollArea>

                <div className="p-4 bg-white border-t border-slate-200 pb-8 sm:pb-4 gap-3 flex flex-col sm:flex-row shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                    <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">Start Consultation</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
