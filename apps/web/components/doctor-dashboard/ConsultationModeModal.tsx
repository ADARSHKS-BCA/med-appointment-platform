import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Printer, Plus, Trash2, CheckCircle2, Save } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

interface ConsultationModeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patientName?: string;
}

export function ConsultationModeModal({ open, onOpenChange, patientName = "Sarah Smith" }: ConsultationModeModalProps) {
    const [prescriptions, setPrescriptions] = useState([{ id: 1, drug: '', dosage: '', duration: '', instructions: '' }]);
    const [labTests, setLabTests] = useState<string[]>([]);
    const [newTest, setNewTest] = useState('');

    // For printing
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Prescription_${patientName.replace(' ', '_')}`,
    });

    const addPrescription = () => {
        setPrescriptions([...prescriptions, { id: Date.now(), drug: '', dosage: '', duration: '', instructions: '' }]);
    };

    const removePrescription = (id: number) => {
        setPrescriptions(prescriptions.filter(p => p.id !== id));
    };

    const updatePrescription = (id: number, field: string, value: string) => {
        setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const addLabTest = () => {
        if (newTest.trim()) {
            setLabTests([...labTests, newTest.trim()]);
            setNewTest('');
        }
    };

    const removeLabTest = (index: number) => {
        setLabTests(labTests.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-slate-50 flex flex-col h-[90vh]">
                <DialogHeader className="p-6 pb-4 bg-white border-b border-slate-200 shadow-sm z-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <DialogTitle className="text-xl text-blue-900 flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                                Active Consultation: {patientName}
                            </DialogTitle>
                            <DialogDescription className="mt-1">
                                Fill out the consultation details below to generate a prescription.
                            </DialogDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="hidden sm:flex border-blue-200 text-blue-700 hover:bg-blue-50">
                                <Save className="w-4 h-4 mr-2" /> Save Draft
                            </Button>
                            <Button size="sm" onClick={handlePrint} className="bg-slate-800 hover:bg-slate-900 text-white shadow-md">
                                <Printer className="w-4 h-4 mr-2" /> Print PDF
                            </Button>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20">
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Complete
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-hidden" ref={printRef}>
                    <ScrollArea className="h-full p-6">
                        <div className="max-w-3xl mx-auto space-y-8 pb-10">

                            {/* PDF Header - Visible only when printing or as clinical header */}
                            <div className="hidden print:block mb-8 border-b-2 border-slate-800 pb-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-800">MediConnect Clinic</h1>
                                        <p className="text-slate-600 text-sm mt-1">123 Health Avenue, Medical District</p>
                                        <p className="text-slate-600 text-sm">Phone: +1 234 567 8900</p>
                                    </div>
                                    <div className="text-right">
                                        <h2 className="text-xl font-bold text-blue-800">Dr. Premium Doctor</h2>
                                        <p className="text-slate-600 text-sm mt-1">MBBS, MD (General Medicine)</p>
                                        <p className="text-slate-600 text-sm">Reg. No: MED-12345</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between bg-slate-50 p-3 rounded-md border border-slate-200">
                                    <div>
                                        <p className="text-sm"><span className="font-semibold">Patient:</span> {patientName}</p>
                                        <p className="text-sm"><span className="font-semibold">Age/Sex:</span> 34 / Female</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm"><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
                                        <p className="text-sm"><span className="font-semibold">ID:</span> PT-98765</p>
                                    </div>
                                </div>
                            </div>

                            {/* Clinical Notes Section */}
                            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:border-0 print:shadow-none print:p-0 print:mb-6">
                                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                    Clinical Notes
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="symptoms" className="text-slate-600">Presenting Symptoms</Label>
                                            <Textarea id="symptoms" placeholder="e.g., Fever for 3 days, dry cough..." className="resize-none h-24 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="diagnosis" className="text-slate-600">Diagnosis (Provisional/Final)</Label>
                                            <Textarea id="diagnosis" placeholder="e.g., Viral Pharyngitis" className="resize-none h-24 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notes" className="text-slate-600">Additional Findings / Vitals</Label>
                                        <Input id="notes" placeholder="BP: 120/80, Temp: 99.8F, Pulse: 88bpm" className="bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500" />
                                    </div>
                                </div>
                            </section>

                            {/* Rx Section */}
                            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:border-0 print:shadow-none print:p-0 print:mb-6">
                                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                                    <h3 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-1">
                                        <span className="text-3xl font-light text-slate-400">Rx</span> Medications
                                    </h3>
                                    <Button variant="outline" size="sm" onClick={addPrescription} className="hidden print:hidden border-blue-200 text-blue-700 hover:bg-blue-50">
                                        <Plus className="w-4 h-4 mr-1" /> Add Medicine
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {prescriptions.map((p, index) => (
                                        <div key={p.id} className="group flex gap-3 items-start bg-slate-50 p-3 rounded-lg border border-slate-100 relative print:p-0 print:bg-transparent print:border-b print:rounded-none">
                                            <div className="bg-white rounded p-1 w-6 h-6 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0 print:hidden">{index + 1}</div>
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                                                <div className="md:col-span-4">
                                                    <Label className="text-xs text-slate-500 mb-1 block print:hidden">Medicine Name</Label>
                                                    <Input
                                                        value={p.drug}
                                                        onChange={(e) => updatePrescription(p.id, 'drug', e.target.value)}
                                                        placeholder="Paracetamol 500mg"
                                                        className="h-9 font-medium"
                                                    />
                                                </div>
                                                <div className="md:col-span-3">
                                                    <Label className="text-xs text-slate-500 mb-1 block print:hidden">Dosage (1-0-1)</Label>
                                                    <Input
                                                        value={p.dosage}
                                                        onChange={(e) => updatePrescription(p.id, 'dosage', e.target.value)}
                                                        placeholder="1-0-1 (After Food)"
                                                        className="h-9"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <Label className="text-xs text-slate-500 mb-1 block print:hidden">Duration</Label>
                                                    <Input
                                                        value={p.duration}
                                                        onChange={(e) => updatePrescription(p.id, 'duration', e.target.value)}
                                                        placeholder="5 Days"
                                                        className="h-9"
                                                    />
                                                </div>
                                                <div className="md:col-span-3">
                                                    <Label className="text-xs text-slate-500 mb-1 block print:hidden">Instructions</Label>
                                                    <Input
                                                        value={p.instructions}
                                                        onChange={(e) => updatePrescription(p.id, 'instructions', e.target.value)}
                                                        placeholder="Take with water"
                                                        className="h-9"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removePrescription(p.id)}
                                                className="h-9 w-9 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0 print:hidden opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
                                {/* Lab Tests Section */}
                                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:border-0 print:shadow-none print:p-0">
                                    <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                                        Recommended Lab Tests
                                    </h3>
                                    <div className="flex gap-2 mb-4 print:hidden">
                                        <Input
                                            value={newTest}
                                            onChange={(e) => setNewTest(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addLabTest()}
                                            placeholder="e.g., Complete Blood Count"
                                            className="h-9"
                                        />
                                        <Button size="sm" onClick={addLabTest} variant="secondary" className="h-9 whitespace-nowrap bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                                            Add Test
                                        </Button>
                                    </div>
                                    {labTests.length > 0 ? (
                                        <ul className="space-y-2 list-disc list-inside print:pl-4">
                                            {labTests.map((test, i) => (
                                                <li key={i} className="text-sm text-slate-700 flex justify-between items-center group">
                                                    {test}
                                                    <Button variant="ghost" size="sm" onClick={() => removeLabTest(i)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500 print:hidden opacity-0 group-hover:opacity-100">
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic print:hidden">No lab tests recommended.</p>
                                    )}
                                </section>

                                {/* Follow-up & Advice Section */}
                                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:border-0 print:shadow-none print:p-0">
                                    <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                                        Advice & Follow-up
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="advice" className="text-slate-600">General Advice / Diet</Label>
                                            <Textarea id="advice" placeholder="e.g., Drink plenty of fluids, avoid cold food." className="resize-none h-16 bg-slate-50/50 border-slate-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="followup" className="text-slate-600">Follow-up Schedule</Label>
                                            <Input id="followup" placeholder="e.g., After 5 days or SOS" className="bg-slate-50/50 border-slate-200" />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Digital Signature for PDF print */}
                            <div className="hidden print:flex justify-end mt-16 pt-8">
                                <div className="text-center border-t border-slate-300 pt-2 px-8">
                                    <p className="font-bold text-slate-800">Dr. Premium Doctor</p>
                                    <p className="text-xs text-slate-500 font-serif italic mt-1">Digitally Signed Option</p>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
