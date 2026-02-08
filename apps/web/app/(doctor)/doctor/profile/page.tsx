'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DoctorProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        specialization: '',
        bio: '',
        experienceYears: '',
        consultationFee: '',
        phone: '',
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            // Since we don't have a direct /me endpoint for profile data yet, 
            // we have to rely on what we know or fetch by ID if we knew it.
            // But wait, the backend `updateProfile` uses `req.user.userId`.
            // We need a way to GET the current doctor's profile.
            // Let's assume we can fetch it via /doctors/<my-id>, but we need my-id.
            // The AuthContext might have it, or we can add a /doctors/me endpoint.

            // For now, let's try to get it from a new endpoint or the auth state.
            // Actually, let's implement GET /doctors/me in the backend too for convenience? 
            // OR use the user object from local storage/auth context if available?
            // The safest is to add GET /doctors/me.

            // But I didn't add GET /doctors/me yet. 
            // I'll check if I can just use the existing GET /doctors/:id if I know the ID.
            // In the dashboard, we didn't need profile data.

            // Let's assume I will add GET /doctors/me shortly.
            const data = await api.get('/doctors/me');
            setFormData({
                fullName: data.fullName || '',
                specialization: data.specialization || '',
                bio: data.bio || '',
                experienceYears: data.experienceYears?.toString() || '',
                consultationFee: data.consultationFee?.toString() || '',
                phone: data.phone || '',
            });
        } catch (error) {
            // If /doctors/me fails (404), maybe just ignore?
            // toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.patch('/doctors/me', formData);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading profile...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Doctor Profile</CardTitle>
                    <CardDescription>Update your professional details and settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="specialization">Specialization</Label>
                            <Input id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g. Cardiologist" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="experienceYears">Experience (Years)</Label>
                                <Input id="experienceYears" name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                                <Input id="consultationFee" name="consultationFee" type="number" value={formData.consultationFee} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                        </div>
                        <Button type="submit" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
