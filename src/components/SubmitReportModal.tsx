import React, { useState, useRef } from 'react';
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  UploadCloud,
  Trash2,
  Image as ImageIcon,
  ShieldCheck,
  Info
} from 'lucide-react';
import { CommunityReport, ReportCategory, CityConfig } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface SubmitReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: CityConfig;
  onSubmitReport: (report: CommunityReport) => void;
}

export const SubmitReportModal: React.FC<SubmitReportModalProps> = ({
  isOpen,
  onClose,
  city,
  onSubmitReport
}) => {
  const { t, language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<ReportCategory>('Road Hazard');
  const [title, setTitle] = useState('');
  const [locationName, setLocationName] = useState('');
  const [severity, setSeverity] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [description, setDescription] = useState('');
  
  // Photo upload states
  const [photoDataUrl, setPhotoDataUrl] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');
  const [photoSizeKb, setPhotoSizeKb] = useState<number>(0);
  const [photoError, setPhotoError] = useState<string>('');

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const categories: ReportCategory[] = [
    'Road Hazard',
    'Accident',
    'Cleanliness',
    'Accessibility Issue',
    'Crowding',
    'Street Lighting',
    'Other'
  ];

  // Client-side canvas image compressor to safely fit inside browser localStorage quotas
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setPhotoError(t.errFileType);
      return;
    }

    // Validate size (max 2.5MB)
    const maxBytes = 2.5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setPhotoError(t.errFileSize);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Downscale to max dimension of 640px to ensure tiny footprint (~35-50KB) in localStorage
        const maxDim = 640;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
          setPhotoDataUrl(compressedDataUrl);
          setPhotoName(file.name);
          setPhotoSizeKb(Math.round(compressedDataUrl.length * 0.75 / 1024));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoDataUrl('');
    setPhotoName('');
    setPhotoSizeKb(0);
    setPhotoError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = t.errTitleReq;
    if (!locationName.trim()) newErrors.locationName = t.errLocReq;
    if (!description.trim()) newErrors.description = t.errDescReq;
    if (!agreedToTerms) newErrors.terms = t.errTermsReq;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate slight pseudo offset around city coordinates for map pin placement
    const latOffset = (Math.random() - 0.5) * 0.04;
    const lngOffset = (Math.random() - 0.5) * 0.04;

    const newReport: CommunityReport = {
      id: `rep-${Date.now()}`,
      category,
      title: title.trim(),
      locationName: locationName.trim(),
      city: city.id,
      lat: Number((city.lat + latOffset).toFixed(4)),
      lng: Number((city.lng + lngOffset).toFixed(4)),
      description: description.trim(),
      photoUrl: photoDataUrl || undefined,
      photoName: photoName || undefined,
      photoSizeKb: photoSizeKb || undefined,
      timestamp: language === 'mr' ? 'आत्ताच' : language === 'hi' ? 'अभी-अभी' : 'Just now',
      verificationStatus: 'Unverified',
      upvotes: 1,
      isLocalOnly: true,
      severity
    };

    try {
      onSubmitReport(newReport);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
        // Reset form
        setTitle('');
        setLocationName('');
        setDescription('');
        handleRemovePhoto();
        setAgreedToTerms(false);
        setErrors({});
      }, 1200);
    } catch (err) {
      console.error('Report submission failed:', err);
      setErrors({ form: 'Storage limit exceeded. Try removing old reports or uploading a smaller photo.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-950/60 border border-orange-700/60 text-orange-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t.modalReportTitle}</h2>
              <p className="text-xs text-slate-400">{t.modalReportSub} • {city.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        {submittedSuccess ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">{t.successTitle}</h3>
            <p className="text-xs text-slate-400">
              {t.successDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto text-xs">
            
            {errors.form && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {errors.form}
              </div>
            )}

            {/* Category & Priority */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">{t.fieldCategory}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ReportCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">{t.fieldSeverity}</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="low">{t.priorityLow}</option>
                  <option value="moderate">{t.priorityModerate}</option>
                  <option value="high">{t.priorityHigh}</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">{t.fieldHeadline}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Broken streetlight on Kasba Peth approach"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              {errors.title && <p className="text-rose-400 text-[11px] mt-0.5">{errors.title}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">{t.fieldLocation}</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Near Goodluck Chowk, FC Road"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              {errors.locationName && <p className="text-rose-400 text-[11px] mt-0.5">{errors.locationName}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">{t.fieldDescription}</label>
              <textarea
                value={description}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about current road/safety situation, accessibility hurdles, or alternate detours..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
              {errors.description && <p className="text-rose-400 text-[11px] mt-0.5">{errors.description}</p>}
            </div>

            {/* Photo Attachment Section */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-300 block">{t.fieldPhotoUpload}</label>
              
              {!photoDataUrl ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    id="report-photo-input"
                  />
                  <label
                    htmlFor="report-photo-input"
                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-800 hover:border-amber-600/70 rounded-xl bg-slate-950/60 cursor-pointer transition text-center group"
                  >
                    <UploadCloud className="w-6 h-6 text-slate-500 group-hover:text-amber-400 transition mb-1" />
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-white">
                      Click to browse or drop photo
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      {t.fieldPhotoUploadSub}
                    </span>
                  </label>
                </div>
              ) : (
                /* Photo Preview Card */
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img 
                      src={photoDataUrl} 
                      alt="Report preview" 
                      className="w-14 h-14 object-cover rounded-lg border border-slate-700 shrink-0" 
                    />
                    <div className="overflow-hidden">
                      <span className="text-xs font-semibold text-slate-200 block truncate">
                        {photoName}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono block">
                        Compressed for local storage (~{photoSizeKb} KB)
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950/80 text-slate-400 hover:text-rose-300 border border-slate-800 transition shrink-0"
                    title={t.fieldRemovePhoto}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {photoError && (
                <p className="text-rose-400 text-[11px]">{photoError}</p>
              )}
            </div>

            {/* Disclaimer & Acknowledgement */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-300 leading-snug">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded text-amber-500 focus:ring-0 shrink-0"
                />
                <span>
                  {t.fieldDisclaimerCheck}
                </span>
              </label>
              {errors.terms && <p className="text-rose-400 text-[11px]">{errors.terms}</p>}
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-md shadow-orange-950/40"
              >
                {t.submitBtn}
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
