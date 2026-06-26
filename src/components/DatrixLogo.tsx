import React from 'react';

interface DatrixLogoProps {
  /** Stroke color — defaults to the current text color (via `currentColor`) */
  color?: string;
  /** Height of the SVG in pixels. Width scales proportionally (≈ 5.2 : 1 ratio). */
  height?: number;
  className?: string;
}

/**
 * DATRIX brand wordmark — heavy block letters with stroke outline only,
 * matching the reference logo (transparent fill, bold contour).
 */
export default function DatrixLogo({
  color = 'currentColor',
  height = 32,
  className = '',
}: DatrixLogoProps) {
  // Viewbox matches the natural proportions of the letterforms: ~520 × 100
  return (
    <svg
      viewBox="0 0 520 100"
      height={height}
      width={height * 5.2}
      aria-label="Datrix"
      role="img"
      className={className}
      style={{ display: 'block' }}
    >
      {/* D */}
      <path
        d="M10 10 L10 90 L42 90 Q72 90 72 50 Q72 10 42 10 Z
           M26 24 L40 24 Q58 24 58 50 Q58 76 40 76 L26 76 Z"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* A */}
      <path
        d="M84 90 L104 10 L124 10 L144 90
           M90 62 L138 62"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* T */}
      <path
        d="M154 10 L230 10
           M192 10 L192 90"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* R */}
      <path
        d="M242 90 L242 10 L272 10 Q300 10 300 38 Q300 58 278 63 L300 90
           M258 24 L270 24 Q286 24 286 38 Q286 52 270 52 L258 52"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* I */}
      <path
        d="M316 10 L316 90
           M304 10 L328 10
           M304 90 L328 90"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* X */}
      <path
        d="M342 10 L402 90
           M402 10 L342 90"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
