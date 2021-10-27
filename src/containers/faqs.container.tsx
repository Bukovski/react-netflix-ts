import React from 'react';
import { Accordion } from '../components';
import faqsData from '../fixtures/faqs.json';
import { IFaqsJson } from "../types/main";


const FaqsContainer = () => {
  return (
    <Accordion>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      <Accordion.Frame>
        {
          faqsData.map((item: IFaqsJson) => (
            <Accordion.Item key={ item.id }>
              <Accordion.Header>{ item.header }</Accordion.Header>
              <Accordion.Body>{ item.body }</Accordion.Body>
            </Accordion.Item>
          ))
        }
      </Accordion.Frame>


    </Accordion>
  );
}


export default FaqsContainer;
