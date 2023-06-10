import { Fragment } from 'react';

export const Provider = ({ children, providers }) => {
  return (
    <Fragment>
      {providers.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </Fragment>
  );
};
