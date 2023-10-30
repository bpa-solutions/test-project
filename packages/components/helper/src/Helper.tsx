import { AGENTS, ClippyProvider } from '@react95/clippy';
import React from 'react';

import { Clippy } from './Clippy';

/**
 * Page Helper component
 * @returns JSX.Element
 */
const PageHelper = (): JSX.Element => {
  return (
    <ClippyProvider agentName={AGENTS.CLIPPY}>
      <Clippy />
    </ClippyProvider>
  );
};

export default PageHelper;
