import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { OrderValidation } from './order-validation';

describe.skip('OrderValidation component', () => {
  it.skip('should have both delivery modes visible and not disabled', () => {});

  it.skip('should have cancel and back buttons visible and not disabled', () => {});

  it.skip('should have submit button visible', () => {});

  it.skip('should have props order delivery mode initially selected', () => {});

  describe.skip('with pick-up selected', () => {
    it.skip('should have submit button not disabled', () => {});

    it.skip('should have store info displayed in contact zone', () => {});
  });

  describe.skip('with delivery selected ', () => {
    it.skip('should have price updated', () => {});
  });

  describe.skip('with delivery selected and contact missing', () => {
    it.skip('should have submit button disabled', () => {});

    it.skip('should have message displayed in contact zone', () => {});

    it.skip('should have enter button visible and not disabled', () => {});

    it.skip('should open contact modal on click on enter button', () => {});
  });

  describe.skip('with delivery selected and contact filled', () => {
    it.skip('should have submit button not disabled', () => {});

    it.skip('should have contact info displayed in contact zone', () => {});

    it.skip('should have modify button visible and not disabled', () => {});

    it.skip('should open contact modal on click on modify button', () => {});
  });
});
