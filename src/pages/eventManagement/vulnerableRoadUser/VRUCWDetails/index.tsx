import React from 'react';
import { history } from 'umi';
import BaseContainer from '@/components/BaseContainer';
import CollisionWarningDetails from '@/components/CollisionWarningDetails';

const VRUCWDetails: React.FC<RouterMatchTypes> = ({ location: { state } }) => {
  if (!state) {
    history.goBack();
  }

  return (
    <BaseContainer back>
      <CollisionWarningDetails type="VRUCW" data={state as Event.ICWListItem} />
    </BaseContainer>
  );
};

export default VRUCWDetails;
