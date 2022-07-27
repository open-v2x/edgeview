import React from 'react';
import { history } from 'umi';
import BaseContainer from '@/components/BaseContainer';
import CollisionWarningDetails from '@/components/CollisionWarningDetails';

const ICWDetails: React.FC<RouterMatchTypes> = ({ location: { state } }) => {
  if (!state) {
    history.goBack();
  }

  return (
    <BaseContainer back>
      <CollisionWarningDetails type="ICW" data={state as Event.ICWListItem} />
    </BaseContainer>
  );
};

export default ICWDetails;
