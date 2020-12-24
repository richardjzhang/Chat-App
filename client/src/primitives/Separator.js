// @flow
import styled from '@emotion/styled';

const Separator = styled.div<{ grow?: boolean, size: number }>((props) => ({
  flexShrink: 0,
  height: props.size,
  width: props.size,
  ...(props.grow ? { flexGrow: 1 } : {}),
}));

export default Separator;
