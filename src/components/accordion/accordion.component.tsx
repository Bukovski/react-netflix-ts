import React, { useState, useContext, createContext } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './accordion.style';


interface IAccordion {
  children: JSX.Element | JSX.Element[] | string,
  [ restProps: string ]: any
}


interface IContextState {
  toggleShow: boolean;
  setToggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}


const ToggleContext = createContext<Partial<IContextState>>({});

function Accordion({ children, ...restProps }: IAccordion) {
  return (
    <Container { ...restProps }>
      <Inner>{ children }</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }: IAccordion) {
  return <Title { ...restProps }>{ children }</Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...restProps }: IAccordion) {
  return <Frame { ...restProps }>{ children }</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }: IAccordion) {
  const [ toggleShow, setToggleShow ] = useState<boolean>(false);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item { ...restProps }>{ children }</Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }: IAccordion) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <Header onClick={() => setToggleShow!(!toggleShow)} { ...restProps }>
      { children }
      {
        toggleShow
          ? ( <img src={ `${ process.env.PUBLIC_URL }/images/icons/close-slim.png` } alt="Close" /> )
          : ( <img src={ `${ process.env.PUBLIC_URL }/images/icons/add.png` } alt="Open" /> )
      }
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }: IAccordion) {
  const { toggleShow } = useContext(ToggleContext);

  /* return toggleShow ? <Body { ...restProps }>{ children }</Body> : null; */

  return (
    <Body className={ toggleShow ? 'open' : 'closed' } { ...restProps }>
      <span>{ children }</span>
    </Body>
  );
};


export default Accordion;
