import React from 'react';
import { useTranslation } from 'react-i18next';
import globe from '../assets/globe.svg';
import locator from '../assets/locator.png';
import start from '../assets/start.png';
import Card from '../components/Card.js';
import Intro from '../components/Intro.js';

const LandingPage = () => {
  const { t } = useTranslation();
  const cards = [
    {
      text: 'step_1_text',
      style: 'xl:justify-start xl:pt-2',
      image: start,
      alt: 'start',
      title: 'start'
    },
    {
      text: 'step_2_text',
      style: 'my-28 lg:my-0 xl:my-0 lg:mx-32 xl:mx-32',
      image: locator,
      alt: 'locator',
      title: 'step_2'
    },
    {
      text: 'step_3_text',
      style: '',
      image: globe,
      alt: 'globe',
      title: 'step_3'
    }
  ];
  return (
    <div>
      <div>
        <Intro />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-raleway font-extrabold mt-28 xl:mt-44 mb-10 text-center">
            {t('how_it_work')}
          </h1>
          <div className=" flex flex-col lg:flex-row xl:flex-row mt-12 mb-32">
            {cards.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                alt={card.alt}
                title={`${index + 1}. ${t(card.title)}`}
                text={t(card.text)}
                styles={card.style}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
