import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, Sparkles, CheckCircle2, Contrast, AlertCircle } from 'lucide-react';
import { validateImageUpload } from '../../utils/security.js';

const sampleBabyPhoto = "/images/gallery/portraits/baby-01.webp";

export const photoFilters = [
  { id: "none", label: "Original", cssFilter: "none" },
  { id: "bw", label: "Classic B&W", cssFilter: "grayscale(100%) contrast(110%)" },
  { id: "sepia", label: "Warm Sepia", cssFilter: "sepia(70%) contrast(105%)" },
  { id: "vintage", label: "Vintage Noir", cssFilter: "grayscale(70%) sepia(30%) contrast(120%)" },
  { id: "hdr", label: "Vivid HDR", cssFilter: "saturate(140%) contrast(115%)" }
];

export default function StepPhotoUpload({
  photoUrl,
  onPhotoChange,
  onRemovePhoto,
  activeFilter,
  onSelectFilter
}) {
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState(null);

  const processFile = (file) => {
    if (!file) return;
    setUploadError(null);
    const validation = validateImageUpload(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    onPhotoChange(objectUrl);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
    if (e.target) e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-studio-orange text-white text-xs flex items-center justify-center font-bold">2</span>
          <span>Upload Your Photo</span>
        </h3>
        <span className="text-xs text-gray-400 font-medium">JPG, PNG, WebP</span>
      </div>

      {/* Security File Validation Alert */}
      {uploadError && (
        <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{uploadError}</span>
        </div>
      )}

      {photoUrl ? (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-studio-orange shrink-0">
                <img
                  src={photoUrl}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover"
                  style={{ filter: photoFilters.find(f => f.id === activeFilter)?.cssFilter || 'none' }}
                />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Photo Loaded into Studio Visualizer
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5 truncate">
                  Ready for custom frame & sizing
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors"
                title="Replace Photo"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onRemovePhoto}
                className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-400 hover:bg-rose-900/60 transition-colors"
                title="Remove Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1.5 flex items-center gap-1">
              <Contrast className="w-3.5 h-3.5 text-studio-orange" />
              <span>Studio Photo Tone Filters</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {photoFilters.map((filter) => {
                const isSelected = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => onSelectFilter(filter.id)}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all border ${
                      isSelected
                        ? 'bg-studio-orange/20 border-studio-orange text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/20 hover:border-studio-orange/60 rounded-xl p-6 text-center cursor-pointer transition-all bg-white/[0.02] hover:bg-studio-orange/[0.04] group"
        >
          <div className="w-12 h-12 rounded-full bg-studio-orange/10 text-studio-orange flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-white block mb-1">
            Drag & drop your photograph here
          </span>
          <span className="text-xs text-gray-400 block mb-3">
            or click to browse from device (High Resolution Recommended)
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-studio-orange">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Browse Files</span>
          </span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Clean Sample Baby Photo Option */}
      <div className="pt-2 flex items-center justify-between border-t border-white/5">
        <span className="text-xs text-gray-400">Want to test how it looks first?</span>
        <button
          onClick={() => onPhotoChange(sampleBabyPhoto)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Load Sample Baby Photo</span>
        </button>
      </div>
    </div>
  );
}
