'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCircle, Phone, Calendar, Loader2, Save } from 'lucide-react';

export default function PatientProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        dob: '',
        gender: '',
    });

    useEffect(() => { fetchProfile(); }, []);

    const fetchProfile = async () => {
        try {
            const data = await api.get('/patients/me');
            setFormData({
                fullName: data.fullName || '',
                phone: data.phone || '',
                dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
                gender: data.gender || '',
            });
        } catch (error) {
            // silent
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenderChange = (value: string) => {
        setFormData({ ...formData, gender: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.patch('/patients/me', formData);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="glass rounded-2xl p-8 animate-pulse">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-20 h-20 rounded-3xl bg-slate-200" />
                        <div className="space-y-2"><div className="h-5 w-40 bg-slate-200 rounded-full" /><div className="h-4 w-28 bg-slate-100 rounded-full" /></div>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map(i => <div key={i}><div className="h-4 w-20 bg-slate-200 rounded-full mb-2" /><div className="h-11 bg-slate-100 rounded-xl" /></div>)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="glass rounded-2xl overflow-hidden">
                {/* Gradient header */}
                <div className="h-24 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
                </div>

                <div className="px-8 pb-8">
                    {/* Avatar */}
                    <div className="-mt-10 mb-6 flex items-end gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-indigo-500/25 border-4 border-white">
                            {formData.fullName?.charAt(0)?.toUpperCase() || 'P'}
                        </div>
                        <div className="pb-1">
                            <h2 className="text-xl font-bold text-slate-900">{formData.fullName || 'Patient Profile'}</h2>
                            <p className="text-sm text-slate-500">Update your personal information</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                                <UserCircle className="w-4 h-4 text-slate-400" />
                                Full Name
                            </Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="rounded-xl h-11 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                                <Phone className="w-4 h-4 text-slate-400" />
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="rounded-xl h-11 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                Date of Birth
                            </Label>
                            <Input
                                id="dob"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                                className="rounded-xl h-11 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
                            <Select onValueChange={handleGenderChange} value={formData.gender}>
                                <SelectTrigger className="rounded-xl h-11 border-slate-200">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                    <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl h-11 px-6 font-semibold"
                            >
                                {saving ? (
                                    <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</>
                                ) : (
                                    <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
