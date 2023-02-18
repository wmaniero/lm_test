import React from 'react';

export const setStatic = (key, value) => (BaseComponent) => {
  /* eslint-disable-next-line */
  BaseComponent[key] = value;
  return BaseComponent;
};

export const getDisplayName = (Component) => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

export const setDisplayName = displayName => setStatic('displayName', displayName);
export const wrapDisplayName = (BaseComponent, hocName) => `${hocName}(${getDisplayName(BaseComponent)})`;


export function forwardRef<P extends object>(baseComponentProps: P) {
  return function (BaseComponent: React.ComponentType<P>): React.FC<P> {
    const RefForwardingComponent = React.forwardRef((props: P, ref) => (
      <BaseComponent {...props} {...baseComponentProps} ref={ref} />
    ));

    return setDisplayName(wrapDisplayName(BaseComponent, 'forwardRef'))(RefForwardingComponent);
  };
}
