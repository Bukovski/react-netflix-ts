import React from 'react';
import { Jumbotron } from '../components';
import jumboData from '../fixtures/jumbo.json';
import { IJumboJson } from "../types/main.type";


const JumbotronContainer = () => {
  return (
    <Jumbotron.Container>
      {
        jumboData.map((item: IJumboJson) => (
          <Jumbotron key={ item.id } direction={ item.direction }>
            <Jumbotron.Pane>
              <Jumbotron.Title>{ item.title }</Jumbotron.Title>
              <Jumbotron.SubTitle>{ item.subTitle }</Jumbotron.SubTitle>
            </Jumbotron.Pane>

            <Jumbotron.Pane>
              <Jumbotron.Image src={ process.env.PUBLIC_URL + item.image } alt={ item.alt } />
            </Jumbotron.Pane>
          </Jumbotron>
        ))
      }
    </Jumbotron.Container>
  );
}


export default JumbotronContainer;
