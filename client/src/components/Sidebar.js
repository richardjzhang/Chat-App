// @flow
import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

import Separator from 'src/primitives/Separator';
import type { FullUser, ReducerState, Users } from 'src/reducers/types';
import { colors } from 'src/styles';

const Root = styled.div<{}>({
  padding: 24,
  height: '100%',
  width: 400,
  borderRight: `1px solid ${colors.grayChateau}`,
  flexShrink: 0,
});

const UsersList = styled.div<{}>({
  maxHeight: '100%',
  overflow: 'auto',
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
  user: FullUser,
  users: Users,
|};

const Sidebar = ({ users, user }: Props) => {
  return (
    <Root>
      <Title>Users ({users.length || 1})</Title>
      <Separator size={32} />
      <User>{user?.name ?? 'You'}</User>
      {users.length > 1 && <Separator size={12} />}
      <UsersList>
        {users.map((u, idx) => (
          <React.Fragment key={u.id}>
            {user?.id !== u.id && (
              <>
                <User>{u.name}</User>
                {idx !== users.length - 1 && <Separator size={12} />}
              </>
            )}
          </React.Fragment>
        ))}
      </UsersList>
    </Root>
  );
};

export const SidebarContainer = connect(
  (state: ReducerState) => ({
    user: state.user,
    users: state.users,
  }),
  {},
)(Sidebar);

export default SidebarContainer;
