import React, { useState, useContext, createContext } from 'react';

import { Container, Group, Title, SubTitle, Text, Feature,
  FeatureTitle, FeatureText, FeatureClose, Maturity, Content,
  Meta, Entities, Item, Image } from './card.style';
import { ISelectFilterData } from "../../types/main.type";


interface ICard {
  children?: JSX.Element | JSX.Element[] | string,
  category?: string,
  [ restProps: string ]: any
}

interface IContextState {
  showFeature: boolean,
  setShowFeature: React.Dispatch<React.SetStateAction<boolean>>,
  itemFeature: ISelectFilterData,
  setItemFeature: React.Dispatch<React.SetStateAction<ISelectFilterData>>,
}

export const FeatureContext = createContext<Partial<IContextState>>({});

function Card({ children, ...restProps }: ICard) {
  const [ showFeature, setShowFeature ] = useState(false);
  const [ itemFeature, setItemFeature ] = useState({} as ISelectFilterData);

  return (
    <FeatureContext.Provider value={{ showFeature, setShowFeature, itemFeature, setItemFeature }}>
      <Container { ...restProps }>{ children }</Container>
    </FeatureContext.Provider>
  );
}

Card.Group = function CardGroup({ children, ...restProps }: ICard) {
  return <Group { ...restProps }>{ children }</Group>;
};

Card.Title = function CardTitle({ children, ...restProps }: ICard) {
  return <Title { ...restProps }>{ children }</Title>;
};

Card.SubTitle = function CardSubTitle({ children, ...restProps }: ICard) {
  return <SubTitle { ...restProps }>{ children }</SubTitle>;
};

Card.Text = function CardText({ children, ...restProps }: ICard) {
  return <Text { ...restProps }>{ children }</Text>;
};

Card.Entities = function CardEntities({ children, ...restProps }: ICard) {
  return <Entities { ...restProps }>{ children }</Entities>;
};

Card.Meta = function CardMeta({ children, ...restProps }: ICard) {
  return <Meta { ...restProps }>{ children }</Meta>;
};

Card.Item = function CardItem({ item, children, ...restProps }: ICard) {
  const { setShowFeature, setItemFeature } = useContext(FeatureContext);

  return (
    <Item
      onClick={() => {
        setItemFeature!(item);
        setShowFeature!(true);
      }}
      { ...restProps }
    >
      { children }
    </Item>
  );
};

Card.Image = function CardImage({ ...restProps }: ICard) {
  return <Image { ...restProps } />;
};

Card.Feature = function CardFeature({ children, category, ...restProps }: ICard) {
  const { showFeature, itemFeature, setShowFeature } = useContext(FeatureContext);

  return showFeature && itemFeature
    ? ( <Feature
      { ...restProps }
      src={ `${ process.env.PUBLIC_URL }/images/${ category }/${ itemFeature.genre }/${ itemFeature.slug }/large.jpg` }
    >
      <Content>
        <FeatureTitle>{ itemFeature.title }</FeatureTitle>
        <FeatureText>{ itemFeature.description }</FeatureText>
        <FeatureClose onClick={ () => setShowFeature!(false) }>
          <img src={ `${ process.env.PUBLIC_URL }/images/icons/close.png` } alt="Close" />
        </FeatureClose>

        <Group margin="30px 0" flexDirection="row" alignItems="center">
          <Maturity rating={ itemFeature.maturity }>{ itemFeature.maturity < "12"
            ? 'PG'
            : itemFeature.maturity
          }</Maturity>
          <FeatureText fontWeight="bold">
            { itemFeature.genre.charAt(0).toUpperCase() + itemFeature.genre.slice(1) }
          </FeatureText>
        </Group>

        { children }
      </Content>
    </Feature>)
    : null;
};


export default Card;
