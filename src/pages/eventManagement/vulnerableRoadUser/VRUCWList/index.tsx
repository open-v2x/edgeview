import React from 'react';
import { history } from 'umi';
import BaseContainer from '@/components/BaseContainer';
import CollisionWarningList from '@/components/CollisionWarningList';

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
