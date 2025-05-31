/// <reference types="vite/client" />

// CSS modules
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// SVG imports
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Image file imports
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

// Allow importing from absolute paths
declare module '/vite.svg' {
  const content: string;
  export default content;
}
