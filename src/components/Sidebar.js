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

type Props = {|
  users: Users,
|};

const Sidebar = ({ users }: Props) => {
  console.log(users);
  return (
    <Root>
      <Title>Users</Title>
      <Separator size={32} />
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
