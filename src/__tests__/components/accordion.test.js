import React from 'react';
import { render, fireEvent, screen, queryByAltText } from '@testing-library/react';
import faqsData from '../../fixtures/faqs';
import { Accordion } from '../../components';


describe('<Accordion />', () => {
  it('renders the <Accordion /> with populated data', () => {
    const { container, getByText } = render(
      <Accordion>
        <Accordion.Title>Frequently Asked Questions</Accordion.Title>
        <Accordion.Frame>
          {
            faqsData.map((item) => (
              <Accordion.Item key={item.id}>
                <Accordion.Header>{item.header}</Accordion.Header>
                <Accordion.Body>{item.body}</Accordion.Body>
              </Accordion.Item>
            ))
          }
        </Accordion.Frame>
      </Accordion>
    );
    
    expect(getByText('Frequently Asked Questions')).toBeTruthy();
    expect(getByText('What is Netflix?')).toBeTruthy();
    expect(getByText('How much does Netflix cost?')).toBeTruthy();
    expect(getByText('Where can I watch?')).toBeTruthy();
    expect(getByText('How do I cancel?')).toBeTruthy();
    expect(getByText('What can I watch on Netflix?')).toBeTruthy();
    
    expect(container.firstChild).toMatchSnapshot();
  });
  
  it('opens and closes the <Accordion /> component', () => {
    const { container, queryByText } = render(
      <Accordion>
        <Accordion.Title>Frequently Asked Questions</Accordion.Title>
        <Accordion.Frame>
          {
            faqsData.map((item) => (
              <Accordion.Item key={item.id}>
                <Accordion.Header>{item.header}</Accordion.Header>
                <Accordion.Body data-testid="accordion-body">{item.body}</Accordion.Body>
              </Accordion.Item>
            ))
          }
        </Accordion.Frame>
      </Accordion>
    );
    
    const linkOnParentDiv = queryByText(/Netflix is a streaming service that offers/).closest("div");
    const linkOnButton = queryByText('What is Netflix?');
    

    expect(linkOnParentDiv).toHaveClass("closed");
    expect(linkOnButton.querySelector('img[alt="Open"]')).toBeTruthy();
    
    fireEvent.click(linkOnButton);
    expect(linkOnParentDiv).not.toHaveClass("closed");
    expect(linkOnButton.querySelector('img[alt="Close"]')).toBeTruthy();
    
    fireEvent.click(linkOnButton);
    expect(linkOnParentDiv).toHaveClass("closed");
    expect(linkOnButton.querySelector('img[alt="Open"]')).toBeTruthy();
    
    expect(container.firstChild).toMatchSnapshot();
  });
});
