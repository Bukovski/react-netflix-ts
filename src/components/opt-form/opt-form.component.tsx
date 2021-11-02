import React from 'react';
import { Container, Input, Break, Button, Text } from './opt-form.style';


interface IOptForm {
  children?: JSX.Element | JSX.Element[] | string,
  [ restProps: string ]: any
}


function OptForm({ children, ...restProps }: IOptForm) {
  return <Container { ...restProps }>{ children }</Container>;
}

OptForm.Input = function OptFormInput({ ...restProps }: IOptForm) {
  return <Input { ...restProps } />;
};

OptForm.Button = function OptFormButton({ children, ...restProps }: IOptForm) {
  return (
    <Button { ...restProps }>
      { children } <img src={ `${ process.env.PUBLIC_URL }/images/icons/chevron-right.png` } alt="Try Now" />
    </Button>
  );
};

OptForm.Text = function OptFormText({ children, ...restProps }: IOptForm) {
  return <Text { ...restProps }>{ children }</Text>;
};

OptForm.Break = function OptFormBreak({ ...restProps }: IOptForm) {
  return <Break { ...restProps } />;
};


export default OptForm;
