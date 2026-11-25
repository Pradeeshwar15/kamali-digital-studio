import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SecurityShield() {
  const [toastMessage, setToastMessage] = useState(null);

  const showSecurityNotice = (message) => {
    setToastMessage(message);
  };

  useEffect(() => {
    let timer;
    if (toastMessage) {
      timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    // 1. Intercept Right-Click (Context Menu)
    const handleContextMenu = (e) => {
      // Allow right-click only inside editable input fields
      const tagName = e.target.tagName;
      if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      showSecurityNotice("© Kamali Studio & Digital Lab — Images and content are protected by copyright. Unauthorized saving or copying is prohibited.");
    };

    // 2. Intercept Dragging
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('img')) {
        e.preventDefault();
        showSecurityNotice("Image dragging is disabled to protect client artwork.");
      }
    };

    // 3. Intercept Key Combinations (Ctrl+S, Ctrl+U, Ctrl+P, F12)
    const handleKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = e.key ? e.key.toLowerCase() : '';

      // Ctrl+S / Cmd+S (Save Page)
      if (isCtrlOrCmd && key === 's') {
        e.preventDefault();
        showSecurityNotice("Saving pages and images is disabled on this site.");
        return;
      }

      // Ctrl+U / Cmd+U (View Page Source)
      if (isCtrlOrCmd && key === 'u') {
        e.preventDefault();
        showSecurityNotice("Source inspection shortcut disabled.");
        return;
      }

      // Ctrl+P / Cmd+P (Print to PDF / Print)
      if (isCtrlOrCmd && key === 'p') {
        e.preventDefault();
        showSecurityNotice("Direct printing of digital artwork is restricted.");
        return;
      }

      // F12 key (DevTools shortcut)
      if (e.key === 'F12') {
        showSecurityNotice("Developer tools shortcut detected. Portfolio assets are protected.");
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90%] sm:w-auto px-4 sm:px-6 py-3 rounded-2xl bg-black/95 border border-amber-500/50 text-white shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl flex items-center gap-3 animate-fadeIn pointer-events-none ring-1 ring-amber-400/20"
      role="alert"
    >
      <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-4 h-4 text-amber-400" />
      </div>
      <div className="text-left text-xs leading-tight">
        <span className="font-extrabold text-amber-300 block tracking-wide uppercase text-[10px] mb-0.5">
          Protected Studio Artwork
        </span>
        <span className="text-gray-300 text-[11px] font-medium line-clamp-2">
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
