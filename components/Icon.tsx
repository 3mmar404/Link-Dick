import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const ICONS: Record<string, JSX.Element> = {
    link: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    externalLink: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    inbox: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />,
    all: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />,
    youtube: <path fill="currentColor" d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.25,4,12,4,12,4S5.75,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.75,2,12,2,12s0,4.25,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.75,20,12,20,12,20s6.25,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.25,22,12,22,12S22,7.75,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />,
    facebook: <path fill="currentColor" d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.878V15.89H8.207V12.554h2.231V9.926 c0-2.22,1.334-3.455,3.35-3.455c0.959,0,1.933,0.17,1.933,0.17v2.969h-1.52c-1.104,0-1.42,0.655-1.42,1.372v1.654h3.328l-0.532,3.336H13.89v6.002C18.343,21.128,22,16.99,22,12z" />,
    instagram: <path fill="currentColor" d="M12 2a9.99 9.99 0 0 0-3.88.77 5.76 5.76 0 0 0-2.82 2.82A9.99 9.99 0 0 0 2 12a9.99 9.99 0 0 0 .77 3.88 5.76 5.76 0 0 0 2.82 2.82A9.99 9.99 0 0 0 12 22a9.99 9.99 0 0 0 3.88-.77 5.76 5.76 0 0 0 2.82-2.82A9.99 9.99 0 0 0 22 12a9.99 9.99 0 0 0-.77-3.88 5.76 5.76 0 0 0-2.82-2.82A9.99 9.99 0 0 0 12 2zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.5-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />,
    google: <g><path fill="currentColor" d="M21.5,12.5c0-.83-.07-1.62-.2-2.38H12v4.51h5.36c-.23,1.46-1,2.7-2.3,3.55v3h3.86c2.26-2.09,3.56-5.17,3.56-8.68Z" clipRule="evenodd"/><path fill="currentColor" d="M12,22c3.22,0,5.92-1.12,7.9-3.04l-3.86-3c-1.08.72-2.45,1.15-4.04,1.15-3.1,0-5.73-2.1-6.67-4.95H1.4v3.09C3.48,19.86,7.4,22,12,22Z" clipRule="evenodd"/><path fill="currentColor" d="M5.33,14.05c-.2-.6-.33-1.25-.33-1.94,0-.69.12-1.35.33-1.94V7.08H1.4C.54,8.65,0,10.26,0,12.11c0,1.85.54,3.46,1.4,5.03l3.93-3.09Z" clipRule="evenodd"/><path fill="currentColor" d="M12,4.84c1.76,0,3.33.6,4.58,1.79l3.42-3.42C17.92,1.18,15.22,0,12,0,7.4,0,3.48,2.14,1.4,5.2l3.93,3.09c.94-2.85,3.57-4.95,6.67-4.95Z" clipRule="evenodd"/></g>,
    twitter: <path fill="currentColor" d="M22.46,6c-.77.35-1.6.58-2.46.67.88-.53,1.56-1.37,1.88-2.38-.83.5-1.75.85-2.72,1.05C18.37,4.5,17.26,4,16,4c-2.35,0-4.27,1.92-4.27,4.29,0,.34.04.67.11,1-3.56-.18-6.72-1.89-8.84-4.48-.37.63-.58,1.37-.58,2.15,0,1.49.76,2.8,1.91,3.56-.71-.02-1.37-.22-1.95-.55v.05c0,2.08,1.48,3.82,3.44,4.21-.36.1-.74.15-1.13.15-.28,0-.55-.03-.81-.08.55,1.7,2.14,2.94,4.03,2.97-1.47,1.15-3.32,1.83-5.33,1.83-.35,0-.69-.02-1.03-.06,1.9,1.21,4.16,1.92,6.58,1.92,7.9,0,12.22-6.56,12.22-12.22,0-.19,0-.37-.01-.56.84-.6,1.56-1.36,2.14-2.23z" />,
    other: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
};

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
    const icon = ICONS[name] || ICONS['other'];
    const viewBox = (name === 'instagram' || name === 'facebook' || name === 'youtube' || name === 'google' || name === 'twitter') ? "0 0 24 24" : "0 0 24 24";
    const fill = (name === 'instagram' || name === 'facebook' || name === 'youtube' || name === 'google' || name === 'twitter') ? "currentColor" : "none";
    const stroke = (name === 'instagram' || name === 'facebook' || name === 'youtube' || name === 'google' || name === 'twitter') ? "none" : "currentColor";
    return (
        <svg
            className={className}
            fill={fill}
            stroke={stroke}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
        >
            {icon}
        </svg>
    );
};