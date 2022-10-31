import React from 'react';
import { history } from 'umi';
import BaseContainer from 'edge-src/components/BaseContainer';
import CollisionWarningDetails from 'edge-src/components/CollisionWarningDetails';

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
