// @flow
/** @jsxImportSource @emotion/react */
import { ClassNames } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';

type ClassName = string;

// Some of the components that use Portal require scroll prevention
// when open (Modal, Flyout, MainMenu). It is also possible for a few of them
// to be open at the same time (e.g. Modal inside Flyout or nested Modals).
// Therefore we should be careful not to remove scroll prevention until
// all of the components that require scroll prevent unmount - we keep track
// of these by adding `portalWithScrollPreventionClass` to their corresponding
// nodes and checking if any of them is present in the DOM.
// TODO: a better solution is needed for handling the scroll prevention logic,
// possibly the one that:
// * isolates the scroll prevention logic from InnerPortal
// * is represented by a single boolean in the app state
// * avoids using DOM for checks
const portalWithScrollPreventionClass = 'portal-with-scroll-prevention-f2e1bc';

const removeAllClasses = (node: HTMLElement) => {
  // IE11 doesn't support the variadic version of .remove() so we have to
  // manually call it once for each class in the list.
  Array.from(node.classList).forEach((c) => {
    node.classList.remove(c);
  });
};

// Sets the classes on node to be exactly equal to the provided class values.
// This makes it easy for us to have our class list be a pure function of the
// passed classes, which is important for interacting nicely with React.
const setClassList = (node: HTMLElement, ...classValues: Array<ClassName>) => {
  removeAllClasses(node);
  // IE11 doesn't support the variadic version of .add() so we have to
  // manually call it once for each class in the list.
  classValues.forEach((c) => {
    node.classList.add(c);
  });
};

type Props = {
  isOpen: boolean,
  onClose?: () => void,
  children?: React$Node,
  portalClass: ClassName,
  preventScrollClass: ?ClassName,
};

type State = {
  portalNode: ?HTMLDivElement,
};

class InnerPortal extends React.Component<Props, State> {
  rootScrollingElement: ?HTMLElement;

  state = {
    portalNode: null,
  };

  componentDidMount() {
    if (document.body == null) return; // flow refinement
    this.rootScrollingElement = document.getElementById('root');

    if (this.props.isOpen) {
      this.addPortalNode();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.isOpen && this.props.isOpen) this.addPortalNode();
    else if (prevProps.isOpen && !this.props.isOpen) this.removePortalNode();
    else this.updatePortalNode();
  }

  componentWillUnmount() {
    // TODO check whether we will try to remove the DOM node before React has
    // been able to clean up its shit due to the render diff. It sounds like
    // we may need to cleanup on a subsequent tick.
    if (this.props.isOpen && this.state.portalNode != null) {
      this.removePortalNode();
    }
  }

  addPortalNode() {
    const portalNode = document.createElement('div');
    if (document.body != null) document.body.appendChild(portalNode);
    this.setState({ portalNode });
    this.updatePortalNode();
  }

  updatePortalNode() {
    if (this.state.portalNode == null) return;
    setClassList(
      this.state.portalNode,
      ...(this.props.preventScrollClass != null
        ? [portalWithScrollPreventionClass]
        : []),
      this.props.portalClass,
    );
    if (this.props.preventScrollClass != null) {
      this.rootScrollingElement?.classList.add(this.props.preventScrollClass);
    }
  }

  removePortalNode() {
    if (document.body != null && this.state.portalNode != null)
      document.body.removeChild(this.state.portalNode);
    this.setState({ portalNode: null }, () => {
      if (this.props.onClose != null) this.props.onClose();
    });
    if (
      this.props.preventScrollClass != null &&
      document.querySelectorAll(`.${portalWithScrollPreventionClass}`)
        .length === 0
    ) {
      this.rootScrollingElement?.classList.remove(
        this.props.preventScrollClass,
      );
    }
  }

  render() {
    return this.props.isOpen &&
      this.state.portalNode &&
      this.props.children != null
      ? ReactDOM.createPortal(this.props.children, this.state.portalNode)
      : null;
  }
}

const styles = {
  portal: {
    position: 'absolute',
    zIndex: 2147483647, // Necessary to beat Intercom widget.
  },
  preventScroll: {
    overflow: 'hidden',
  },
};

export default function Portal({
  hasScrollPrevention = false,
  isOpen,
  children,
}: {
  hasScrollPrevention?: boolean,
  isOpen: boolean,
  children: React$Node,
}) {
  return (
    <ClassNames>
      {({ css }) => (
        <InnerPortal
          isOpen={isOpen}
          portalClass={css(styles.portal)}
          preventScrollClass={
            hasScrollPrevention ? css(styles.preventScroll) : null
          }
        >
          {children}
        </InnerPortal>
      )}
    </ClassNames>
  );
}
