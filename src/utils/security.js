/**
 * Security & Sanitization Utilities for Kamali Studio & Digital Lab
 */

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export const MAX_UPLOAD_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

/**
 * Validates user-uploaded image files against strict MIME types and size caps.
 * Prevents SVG scripts, HTML polyglots, and oversized payload vulnerabilities.
 */
export function validateImageUpload(file) {
  if (!file) {
    return { valid: false, error: "No file was selected." };
  }

  // 1. Check MIME type
  const mimeType = (file.type || '').toLowerCase();
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType)) {
    return {
      valid: false,
      error: "Invalid file type. Only genuine JPG, PNG, or WebP images are permitted."
    };
  }

  // 2. Check file extension
  const fileName = (file.name || '').toLowerCase();
  const hasValidExt = ALLOWED_IMAGE_EXTENSIONS.some(ext => fileName.endsWith(ext));
  if (!hasValidExt) {
    return {
      valid: false,
      error: "Invalid file extension. Please select an image ending in .jpg, .png, or .webp."
    };
  }

  // 3. Check file size
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeInMb}MB) exceeds the maximum 25MB limit. Please upload an optimized image.`
    };
  }

  return { valid: true, error: null };
}

/**
 * Sanitizes arbitrary text inputs before building URLs or storing in state.
 * Strips script tags, HTML tags, and dangerous executable URI schemas.
 */
export function sanitizeText(input, maxLength = 300) {
  if (!input || typeof input !== 'string') return '';

  return input
    // Strip HTML tags
    .replace(/<[^>]*>/g, '')
    // Strip javascript: or data: URI attempts
    .replace(/(javascript|data|vbscript):/gi, '')
    // Replace dangerous control characters
    .replace(/[<>"'&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim()
    .slice(0, maxLength);
}

/**
 * Cleans phone number inputs to standard digits and optional leading plus sign.
 */
export function sanitizePhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/[^\d+\s-]/g, '').trim().slice(0, 20);
}

// In-memory rate limiting map for form submissions
const submissionTimestamps = new Map();

/**
 * Throttles rapid form actions to prevent automated spam floods.
 */
export function checkSubmissionRateLimit(formId = 'default', cooldownMs = 3000) {
  const now = Date.now();
  const lastTime = submissionTimestamps.get(formId) || 0;
  if (now - lastTime < cooldownMs) {
    return false; // Throttled
  }
  submissionTimestamps.set(formId, now);
  return true; // Allowed
}
