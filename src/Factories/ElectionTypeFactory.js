import FirstPastThePost from '../components/VotingTypes/FirstPastThePost';
import React from 'react';
import StvPvVote from '../components/VotingTypes/StvPvVote';

export default class ElectionTypeFactory {
  static build(data) {
    switch (data.electionType) {
      case 'FPTP':
        return <FirstPastThePost election={data} />;
      case 'PV':
      case 'STV':
        return <StvPvVote election={data} />;
      default:
        return undefined;
    }
  }
}
