import '@testing-library/jest-dom';
import { configure as testLibraryConfigure } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'core-js';
import { configure } from 'enzyme';
import 'regenerator-runtime/runtime';

testLibraryConfigure({ testIdAttribute: 'id' });

jest.mock('react-toastify', () => {
  const actual = jest.requireActual('react-toastify');
  Object.assign(actual, { toast: jest.fn() });
  return actual;
});

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));


configure({ adapter: new Adapter() });
