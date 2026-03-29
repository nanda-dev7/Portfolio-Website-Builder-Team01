import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard, 
  Trash2,
  Camera,
  Mail,
  Smartphone
} from 'lucide-react';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-600">Manage your profile, security, and preferences.</p>
        </div>

        {/* Profile Section */}
        <Card className="p-8">
          <div className="flex items-center gap-8 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
                JD
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                <Camera className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Profile Picture</h3>
              <p className="text-sm text-slate-500 mb-4">PNG, JPG or GIF. Max size of 800K.</p>
              <div className="flex gap-3">
                <Button size="sm">Upload New</Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">Remove</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" defaultValue="John Doe" />
            <Input label="Email Address" defaultValue="john@example.com" icon={<Mail className="w-4 h-4" />} />
            <Input label="Username" defaultValue="johndoe" />
            <Input label="Phone Number" defaultValue="+1 (555) 000-0000" icon={<Smartphone className="w-4 h-4" />} />
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </Card>

        {/* Security Section */}
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Security</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold text-slate-900">Password</p>
                <p className="text-sm text-slate-500">Last changed 3 months ago</p>
              </div>
              <Button variant="secondary" size="sm">Change Password</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
              </div>
              <Button variant="secondary" size="sm">Enable 2FA</Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-8 border-red-100 bg-red-50/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="danger">Delete Account</Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
