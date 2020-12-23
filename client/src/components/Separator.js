// @flow
import styled from '@emotion/styled';

const Separator = styled.div<{ size: number }>((props) => ({
  flexShrink: 0,
  height: props.size,
  width: props.size,
}));

export default Separator;
