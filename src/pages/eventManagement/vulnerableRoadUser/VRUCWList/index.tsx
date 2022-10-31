import React from 'react';
import { history } from 'umi';
import BaseContainer from 'edge-src/components/BaseContainer';
import CollisionWarningList from 'edge-src/components/CollisionWarningList';

const VRUCWList: React.FC = () => {
  return (
    <BaseContainer>
      <CollisionWarningList
        type="VRUCW"
        navigator={(row: Event.ICWListItem) =>
          history.push({ pathname: `/event/vrucw/details`, state: row })
        }
      />
    </BaseContainer>
  );
};

export default VRUCWList;
