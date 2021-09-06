import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Home from '../components/views/home';
import { useSelector, useDispatch } from 'react-redux'; 

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

configure({adapter: new Adapter()});
test('Checking integrity from home view...', () => {
    const viewComp = shallow(<Home />);
    expect(viewComp.text()).toEqual('<AppBarView /><ListTaskView />');
});
