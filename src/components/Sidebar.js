// @flow
import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

import Separator from 'src/components/Separator';
import type { ReducerState, Users } from 'src/reducers/types';
import { colors } from 'src/styles';

const Root = styled.div<{}>({
  padding: 24,
  height: '100%',
  width: 400,
  borderRight: `1px solid ${colors.grayChateau}`,
});

const Title = styled.div<{}>({
  color: colors.cloudBurst,
  fontSize: 32,
  fontWeight: 600,
});

const User = styled.div<{}>({
  color: colors.cloudBurst,
  fontSize: 24,
});

type Props = {|
  users: Users,
|};

const Sidebar = ({ users }: Props) => {
  return (
    <Root>
      <Title>Users</Title>
      <Separator size={32} />
      {users.map((user, idx) => (
        <React.Fragment key={`${user.name}-${idx}`}>
          {idx !== 0 && <Separator size={12} />}
          <User>{user.name}</User>
        </React.Fragment>
      ))}
    </Root>
  );
};

export const SidebarContainer = connect(
  (state: ReducerState) => ({
    users: state.users,
  }),
  {},
)(Sidebar);

export default SidebarContainer;
