import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { Order } from './order';
import { PIZZA_BASES } from 'data/bases';
import { PIZZA_INGREDIENTS } from 'data/ingredients';
import { formatPrice } from 'shared/utils/helpers';
import { STORE_CONTACT } from 'data/store-info';
import { ContactModal } from 'features/contact-modal';
import { DELIVERY_EXTRA_CHARGE } from 'data/order';

jest.mock('features/contact-modal');
const mockContactModal = ContactModal as jest.MockedFunction<typeof ContactModal>;

jest.setTimeout(10000);

function regexEscape(str: string, ignoreCase = false) {
  const escapedStr = str.replace(/[()+]/g, '\\$&');
  return new RegExp(escapedStr, ignoreCase ? 'i' : undefined);
}

describe('Order component', () => {
  const testBase = PIZZA_BASES.filter((item, idx) => idx !== 0)[0];
  const testIngredients = [...PIZZA_INGREDIENTS];
  const testPizzaPrice =
    testBase.price + testIngredients.reduce((prev, item) => prev + item.price, 0);
  const testContact = {
    name: 'Jane Summers',
    address: { line1: 'somewhere', line2: 'and then', city: 'London' },
    phoneNumber: '(0) 911 7777',
  };

  mockContactModal.mockImplementation(({ isOpen, onChange, onClose }) => {
    function handleClick() {
      onChange(testContact);
      onClose();
    }
    return isOpen ? (
      <button type="button" onClick={() => handleClick()}>
        Submit Test Contact
      </button>
    ) : (
      <></>
    );
  });

  const getCancelBtnElt = () => screen.getByRole('button', { name: regexEscape('Annuler', true) });
  const getContinueBtnElt = () =>
    screen.getByRole('button', { name: regexEscape('Continuer', true) });
  const getSubmitBtnElt = () => screen.getByRole('button', { name: regexEscape('Valider', true) });
  const getBackBtnElt = () => screen.getByRole('button', { name: regexEscape('Retour', true) });

  const getPizzaBaseElt = (title: string) =>
    screen.getByRole('radio', { name: regexEscape(title) });
  const getPizzaIngredientElt = (title: string) =>
    screen.getByRole('checkbox', { name: regexEscape(title) });
  const getPickUpElt = () =>
    screen.getByRole('radio', { name: regexEscape('Retrait sur place', true) });
  const getDeliveryElt = () => screen.getByRole('radio', { name: regexEscape('Livraison', true) });

  const getContactZonePickUpTitleElt = () =>
    screen.getByRole('heading', { name: regexEscape('Nos coordonnées', true) });
  const getContactZoneDeliveryTitleElt = () =>
    screen.getByRole('heading', { name: regexEscape('Vos coordonnées', true) });
  const getEnterContactBtnElt = () =>
    screen.getByRole('button', { name: regexEscape('Saisir', true) });
  const getModifyContactBtnElt = () =>
    screen.getByRole('button', { name: regexEscape('Modifier', true) });
  const getMockContactModalBtnElt = () =>
    screen.getByRole('button', { name: 'Submit Test Contact' });

  let userEvt = userEvent.setup();

  async function setTestPizza() {
    await userEvt.click(getPizzaBaseElt(testBase.title));
    for (let i = 0; i < testIngredients.length; i++) {
      await userEvt.click(getPizzaIngredientElt(testIngredients[i].title));
    }
  }

  async function setTestDelivery() {
    await userEvt.click(getDeliveryElt());
    await userEvt.click(getEnterContactBtnElt());
    await userEvt.click(getMockContactModalBtnElt());
  }

  beforeEach(() => {
    userEvt = userEvent.setup();
    render(<Order />);
  });

  describe('at step 1', () => {
    it('should have all bases visible and not disabled and first one should be initially selected', () => {
      PIZZA_BASES.forEach((item) => {
        expect(getPizzaBaseElt(item.title)).toBeVisible();
        expect(getPizzaBaseElt(item.title)).not.toBeDisabled();
      });

      expect(getPizzaBaseElt(PIZZA_BASES[0].title)).toBeChecked();
    });

    it('should have all ingredients visible and not disabled and none should be initially selected', () => {
      PIZZA_INGREDIENTS.forEach((item) => {
        expect(getPizzaIngredientElt(item.title)).toBeVisible();
        expect(getPizzaIngredientElt(item.title)).not.toBeDisabled();
        expect(getPizzaIngredientElt(item.title)).not.toBeChecked();
      });
    });

    it('should have cancel and continue buttons visible and not disabled', () => {
      expect(getCancelBtnElt()).toBeVisible();
      expect(getCancelBtnElt()).not.toBeDisabled();

      expect(getContinueBtnElt()).toBeVisible();
      expect(getContinueBtnElt()).not.toBeDisabled();
    });

    it('should have pizza price updated when selection changes', async () => {
      const initialPrice = PIZZA_BASES[0].price;
      expect(initialPrice).not.toEqual(testPizzaPrice);
      expect(
        screen.getByText(regexEscape(`Prix: ${formatPrice(initialPrice)}`, true))
      ).toBeVisible();

      await setTestPizza();

      expect(
        screen.getByText(regexEscape(`Prix: ${formatPrice(testPizzaPrice)}`, true))
      ).toBeVisible();
    });
  });

  describe('at step 2', () => {
    describe('initial state', () => {
      beforeEach(async () => {
        await userEvt.click(getContinueBtnElt());
      });

      it('should have both delivery modes visible and not disabled, with pick-up initially selected', () => {
        expect(getPickUpElt()).toBeVisible();
        expect(getPickUpElt()).not.toBeDisabled();

        expect(getDeliveryElt()).toBeVisible();
        expect(getDeliveryElt()).not.toBeDisabled();

        expect(getPickUpElt()).toBeChecked();
      });

      it('should have cancel and back buttons visible and not disabled, and submit button visible', () => {
        expect(getCancelBtnElt()).toBeVisible();
        expect(getCancelBtnElt()).not.toBeDisabled();

        expect(getBackBtnElt()).toBeVisible();
        expect(getBackBtnElt()).not.toBeDisabled();

        expect(getSubmitBtnElt()).toBeVisible();
      });
    });

    it('should display base and ingredients previously selected', async () => {
      await setTestPizza();
      await userEvt.click(getContinueBtnElt());

      expect(screen.getByText(regexEscape(testBase.title))).toBeVisible();
      testIngredients.forEach((item) => {
        expect(screen.getByText(regexEscape(item.title))).toBeVisible();
      });
    });

    describe('with pick-up selected', () => {
      beforeEach(async () => {
        await userEvt.click(getContinueBtnElt());
        await userEvt.click(getPickUpElt());
      });

      it('should have submit button not disabled', () => {
        expect(getSubmitBtnElt()).not.toBeDisabled();
      });

      it('should have store info displayed in contact zone', () => {
        expect(getContactZonePickUpTitleElt()).toBeVisible();
        expect(screen.getByText(regexEscape(STORE_CONTACT.address.line1))).toBeVisible();
        expect(screen.getByText(regexEscape(STORE_CONTACT.address.city))).toBeVisible();
        expect(screen.getByText(regexEscape(STORE_CONTACT.phoneNumber))).toBeVisible();
      });
    });

    describe('with delivery selected and contact missing', () => {
      beforeEach(async () => {
        await userEvt.click(getContinueBtnElt());
        await userEvt.click(getDeliveryElt());
      });

      it('should have submit button disabled', () => {
        expect(getSubmitBtnElt()).toBeDisabled();
      });

      it('should have message displayed in contact zone', () => {
        expect(getContactZoneDeliveryTitleElt()).toBeVisible();
        expect(
          screen.getByText(regexEscape('Veuillez saisir vos coordonnées', true))
        ).toBeVisible();
      });

      it('should have enter button visible and not disabled', () => {
        expect(getEnterContactBtnElt()).toBeVisible();
        expect(getEnterContactBtnElt()).not.toBeDisabled();
      });
    });

    describe('with delivery selected and contact filled', () => {
      beforeEach(async () => {
        await userEvt.click(getContinueBtnElt());
        await setTestDelivery();
      });

      it('should have submit button not disabled', () => {
        expect(getSubmitBtnElt()).not.toBeDisabled();
      });

      it('should have contact info displayed in contact zone', () => {
        expect(getContactZoneDeliveryTitleElt()).toBeVisible();
        expect(screen.getByText(regexEscape(testContact.name))).toBeVisible();
        expect(screen.getByText(regexEscape(testContact.address.line1))).toBeVisible();
        expect(screen.getByText(regexEscape(testContact.address.line2))).toBeVisible();
        expect(screen.getByText(regexEscape(testContact.address.city))).toBeVisible();
        expect(screen.getByText(regexEscape(testContact.phoneNumber))).toBeVisible();
      });

      it('should have modify button visible and not disabled', () => {
        expect(getModifyContactBtnElt()).toBeVisible();
        expect(getModifyContactBtnElt()).not.toBeDisabled();
      });
    });

    it('should have pizza price updated when delivery mode changes', async () => {
      await setTestPizza();
      await userEvt.click(getContinueBtnElt());

      await userEvt.click(getPickUpElt());
      expect(screen.getByText(regexEscape(formatPrice(testPizzaPrice)))).toBeVisible();

      await userEvt.click(getDeliveryElt());
      expect(
        screen.getByText(regexEscape(formatPrice(testPizzaPrice + DELIVERY_EXTRA_CHARGE)))
      ).toBeVisible();
    });
  });

  describe('at step 3', () => {
    it('should display store info and correct price for pick up orders', async () => {
      await userEvt.click(getContinueBtnElt());
      await userEvt.click(getSubmitBtnElt());

      expect(screen.getByText(regexEscape('Retrait sur place', true))).toBeVisible();
      expect(screen.getByText(regexEscape(STORE_CONTACT.address.line1))).toBeVisible();
      expect(screen.getByText(regexEscape(STORE_CONTACT.address.city))).toBeVisible();
      expect(screen.getByText(regexEscape(STORE_CONTACT.phoneNumber))).toBeVisible();

      expect(screen.getByText(regexEscape(formatPrice(PIZZA_BASES[0].price)))).toBeVisible();
    });

    it('should display contact info and correct price for delivery orders', async () => {
      await setTestPizza();
      await userEvt.click(getContinueBtnElt());
      await setTestDelivery();
      await userEvt.click(getSubmitBtnElt());

      expect(screen.getByText(regexEscape('Livraison', true))).toBeVisible();
      expect(screen.getByText(regexEscape(testContact.name))).toBeVisible();
      expect(screen.getByText(regexEscape(testContact.address.line1))).toBeVisible();
      expect(screen.getByText(regexEscape(testContact.address.line2))).toBeVisible();
      expect(screen.getByText(regexEscape(testContact.address.city))).toBeVisible();
      expect(screen.getByText(regexEscape(testContact.phoneNumber))).toBeVisible();

      expect(
        screen.getByText(regexEscape(formatPrice(testPizzaPrice + DELIVERY_EXTRA_CHARGE)))
      ).toBeVisible();
    });
  });
});
