// @flow
import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

import Separator from 'src/components/Separator';
import type { ReducerState, Users } from 'src/reducers/types';
import logo from 'src/static/assets/logo.svg';
import { colors } from 'src/styles';

const PADDING = 16;
const LOGO_SIZE = 32;
const BORDER_WIDTH = 1;
export const HEADER_HEIGHT = 2 * PADDING + LOGO_SIZE;

const Root = styled.div<{}>({
  position: 'fixed',
  top: 0,
  left: 0,
  borderBottom: `${BORDER_WIDTH}px solid ${colors.grayChateau}`,
  padding: PADDING,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colors.white,
});

const Logo = styled.img<{}>({
  height: LOGO_SIZE,
  width: LOGO_SIZE,
});

const Info = styled.div<{}>({
  color: colors.shuttleGray,
  fontSize: 14,
});

type Props = {|
  users: Users,
|};

const Header = ({ users }: Props) => {
  return (
    <Root>
      <Logo src={logo} alt="Logo" />
      <Separator grow size={8} />
      <Info>Active users: {users.length}</Info>
    </Root>
  );
};

export const HeaderContainer = connect(
  (state: ReducerState) => ({
    users: state.users,
  }),
  {},
)(Header);

export default HeaderContainer;
