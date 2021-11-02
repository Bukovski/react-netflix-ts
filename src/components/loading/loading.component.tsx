import React from 'react';
import { LockBody, ReleaseBody, Spinner, Picture } from './loading.style';


interface ILoading {
  src: string,
  [ restProps: string ]: any
}

export default function Loading({ src, ...restProps }: ILoading) {
  return (
    <Spinner {...restProps}>
      <LockBody />
      <Picture src={`${ process.env.PUBLIC_URL }/images/users/${ src }.png`} data-testid="loading-picture" />
    </Spinner>
  );
}

Loading.ReleaseBody = function LoadingReleaseBody() {
  return <ReleaseBody />;
};
