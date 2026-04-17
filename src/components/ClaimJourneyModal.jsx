import React from 'react';
import { useApp } from '../context/AppContext';
import LightningPay from './LightningPay';

const ClaimJourneyModal = () => {
  const { activeClaimJourney } = useApp();

  if (!activeClaimJourney) return null;

  return <LightningPay />;
};

export default ClaimJourneyModal;