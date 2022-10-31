import React from 'react';
import { history } from 'umi';
import BaseContainer from 'edge-src/components/BaseContainer';
import CollisionWarningList from 'edge-src/components/CollisionWarningList';

const ICWList: React.FC = () => {
  return (
    <BaseContainer>
      <CollisionWarningList
        type="ICW"
        navigator={(row: Event.ICWListItem) =>
          history.push({ pathname: `/event/icw/details`, state: row })
        }
      />
    </BaseContainer>
  );
};

export default ICWList;
