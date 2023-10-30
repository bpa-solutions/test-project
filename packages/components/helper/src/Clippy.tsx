import { useClippy } from '@react95/clippy';
import React, { useEffect } from 'react';

/**
 * Page Helper component
 * @returns JSX.Element
 */
export const Clippy = (): JSX.Element => {
  const { clippy } = useClippy();

  useEffect(() => {
    if (clippy) {
      clippy.animate();
      setInterval(() => {
        clippy.stopCurrent();
        clippy.animate();
      }, 5000);
    }
  }, [clippy]);

  return <></>;
};
