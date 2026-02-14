import React, { useState } from 'react';
import { X, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BUDGET_RANGES, CONFIG_TYPES } from '../constants';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProjectId?: string;
  onSuccess: () => void;
}

const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, targetProjectId, onSuccess }) => {
  const { addLead } = useApp();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    buyingFor: 'Self',
    budget: '',
    interestedConfig: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      ...formData,
      projectId: targetProjectId,
      buyingFor: formData.buyingFor as 'Self' | 'Investment',
    });
    setStep('success');
    
    // Auto close and redirect after brief animation
    setTimeout(() => {
      onSuccess();
      onClose();
      // Reset after closing
      setTimeout(() => setStep('form'), 500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden bg-white rounded-xl shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-navy-900 text-white">
          <div className="flex items-center gap-2">
            {step === 'form' ? <Lock className="w-5 h-5 text-gold-500" /> : <CheckCircle className="w-5 h-5 text-green-400" />}
            <h3 className="text-lg font-serif tracking-wide">
              {step === 'form' ? 'Unlock Exclusive Pricing' : 'Access Granted'}
            </h3>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                    placeholder="+91 98765..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Buying For</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                    value={formData.buyingFor}
                    onChange={(e) => setFormData({ ...formData, buyingFor: e.target.value })}
                  >
                    <option value="Self">Self Use</option>
                    <option value="Investment">Investment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Budget</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">Select Range</option>
                    {BUDGET_RANGES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Configuration</label>
                <div className="flex flex-wrap gap-2">
                  {CONFIG_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, interestedConfig: type })}
                      className={`px-3 py-1 text-sm border rounded-full transition-all ${
                        formData.interestedConfig === type
                          ? 'bg-navy-900 text-white border-navy-900'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gold-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-white font-bold rounded-lg shadow-lg hover:shadow-gold-500/30 transform hover:-translate-y-0.5 transition-all"
              >
                Reveal Best Price & Floor Plan
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-2">
                Your details are safe. We do not spam.
              </p>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-fade-in">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                 <CheckCircle className="w-8 h-8 text-green-600" />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-navy-900">Thank You!</h4>
                 <p className="text-gray-500">Unlocking project details now...</p>
               </div>
               <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-gold-500 animate-[width_2s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadFormModal;
