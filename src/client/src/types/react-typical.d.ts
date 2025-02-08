declare module 'react-typical' {
    import React from 'react';
  
    interface TypicalProps {
      steps: (string | number)[];
      loop?: number | boolean;
      wrapper?: string;
      className?: string;
    }
  
    const Typical: React.FC<TypicalProps>;
    export default Typical;
  }