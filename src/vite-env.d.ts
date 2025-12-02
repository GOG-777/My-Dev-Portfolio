/// <reference types="vite/client" />

// For image imports
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

// For CSS modules if you use them
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}