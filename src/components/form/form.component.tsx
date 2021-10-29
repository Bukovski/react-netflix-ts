import React from 'react';
import { Container, Error, Base, Title, Text, TextSmall, Link, Input, Submit } from './form.style';

interface IForm {
  children?: JSX.Element | JSX.Element[] | string | React.ReactNode,
  [ restProps: string ]: any
}

function Form({ children, ...restProps }: IForm) {
  return <Container { ...restProps }>{ children }</Container>;
}

Form.Error = function FormError({ children, ...restProps }: IForm) {
  return <Error { ...restProps }>{ children }</Error>;
};

Form.Base = function FormBase({ children, ...restProps }: IForm) {
  return <Base { ...restProps }>{ children }</Base>;
};

Form.Title = function FormTitle({ children, ...restProps }: IForm) {
  return <Title { ...restProps }>{ children }</Title>;
};

Form.Text = function FormText({ children, ...restProps }: IForm) {
  return <Text { ...restProps }>{ children }</Text>;
};

Form.TextSmall = function FormTextSmall({ children, ...restProps }: IForm) {
  return <TextSmall { ...restProps }>{ children }</TextSmall>;
};

Form.Link = function FormLink({ children, ...restProps }: IForm) {
  // @ts-ignore
  return <Link { ...restProps }>{ children }</Link>;
};

Form.Input = function FormInput({ children, ...restProps }: IForm) {
  return <Input { ...restProps }>{ children }</Input>;
};

Form.Submit = function FormSubmit({ children, ...restProps }: IForm) {
  return <Submit { ...restProps }>{ children }</Submit>;
};


export default Form;
