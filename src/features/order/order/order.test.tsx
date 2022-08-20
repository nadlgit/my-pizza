import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { Order } from './order';
import { PIZZA_BASES } from 'data/bases';
import { PIZZA_INGREDIENTS } from 'data/ingredients';
import { STORE_CONTACT } from 'data/store-info';
import { ContactModal } from 'features/contact-modal';

jest.mock('features/contact-modal');

describe.skip('Order component', () => {
  const cancelButtonLabel = 'Annuler';
  const continueButtonLabel = 'Continuer';
  const submitButtonLabel = 'Valider';
  const backButtonLabel = 'Retour';
  const pickUpLabel = 'Retrait sur place';
  const deliveryLabel = 'Livraison';
  const enterContactButtonLabel = 'Saisir';
  const modifyContactButtonLabel = 'Modifier';

  const fakeContact = {
    name: 'Jane Summers',
    address: { line1: 'somewhere', line2: 'and then', city: 'Paris' },
    phoneNumber: '(0) 911 7777',
  };

  describe('at step 1 (base and ingredients selection)', () => {
    beforeEach(() => {
      render(<Order />);
    });

    describe('initial state', () => {
      it('all bases should be visible and not disabled and first one should be selected', () => {
        let element;
        PIZZA_BASES.forEach((item, idx) => {
          element = screen.getByRole('radio', {
            name: new RegExp(item.title, 'i'),
            checked: idx === 0,
          });
          expect(element).toBeVisible();
          expect(element).not.toBeDisabled();
        });
      });

      it('all ingredients should be visible and not disabled and none should be selected', () => {
        let element;
        PIZZA_INGREDIENTS.forEach((item) => {
          element = screen.getByRole('checkbox', {
            name: new RegExp(item.title, 'i'),
            checked: false,
          });
          expect(element).toBeVisible();
          expect(element).not.toBeDisabled();
        });
      });

      it('action buttons should be visible and not disabled', () => {
        let element;

        element = screen.getByRole('button', { name: new RegExp(cancelButtonLabel, 'i') });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();

        element = screen.getByRole('button', { name: new RegExp(continueButtonLabel, 'i') });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();
      });
    });
  });

  describe('at step 2 (intermediate summary and delivery selection)', () => {
    let userEvt = userEvent.setup();

    beforeEach(async () => {
      userEvt = userEvent.setup();
      render(<Order />);
      await userEvt.click(
        screen.getByRole('button', {
          name: new RegExp(continueButtonLabel, 'i'),
        })
      );
    });

    describe('initial state', () => {
      it('both delivery modes should be visible and not disabled and pick up should be selected', async () => {
        let element;

        element = screen.getByRole('radio', { name: new RegExp(pickUpLabel, 'i'), checked: true });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();

        element = screen.getByRole('radio', {
          name: new RegExp(deliveryLabel, 'i'),
          checked: false,
        });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();
      });

      it('action buttons should be visible and not disabled', async () => {
        let element;

        element = screen.getByRole('button', { name: new RegExp(backButtonLabel, 'i') });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();

        element = screen.getByRole('button', { name: new RegExp(cancelButtonLabel, 'i') });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();

        element = screen.getByRole('button', { name: new RegExp(submitButtonLabel, 'i') });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();
      });

      it('contact zone should display store info', () => {
        expect(
          screen.getByRole('heading', { name: new RegExp('Nos coordonnées', 'i') })
        ).toBeVisible();
        expect(screen.getByText(new RegExp(STORE_CONTACT.address.line1))).toBeVisible();
        expect(screen.getByText(new RegExp(STORE_CONTACT.address.city))).toBeVisible();
        expect(screen.getByText(new RegExp(STORE_CONTACT.phoneNumber))).toBeVisible();

        expect(
          screen.queryByRole('button', { name: new RegExp(enterContactButtonLabel, 'i') })
        ).not.toBeInTheDocument();
      });
    });

    describe('when delivery is selected and contact info is missing', () => {
      beforeEach(async () => {
        await userEvt.click(
          screen.getByRole('radio', {
            name: new RegExp(deliveryLabel, 'i'),
          })
        );
      });

      it('validation button should be disabled', async () => {
        const element = screen.getByRole('button', { name: new RegExp(submitButtonLabel, 'i') });
        expect(element).toBeVisible();
        expect(element).toBeDisabled();
      });

      it('contact zone should display message and modify button should be visible and not disabled', async () => {
        expect(
          screen.getByRole('heading', { name: new RegExp('Vos coordonnées', 'i') })
        ).toBeVisible();
        expect(screen.getByText(new RegExp('Veuillez saisir vos coordonnées', 'i'))).toBeVisible();

        const element = screen.getByRole('button', {
          name: new RegExp(enterContactButtonLabel, 'i'),
        });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();
      });
    });

    describe('contact handling', () => {
      ContactModal.mockImplementation(({ isOpen, contact, onChange, onClose }) => {
        const MockName = 'contact-modal-mock';
        if (isOpen) {
          onChange(fakeContact);
          onClose();
        }
        return <MockName {...{ isOpen, contact, onChange, onClose }} />;
      });

      beforeEach(async () => {
        await userEvt.click(
          screen.getByRole('radio', {
            name: new RegExp(deliveryLabel, 'i'),
          })
        );
        await userEvt.click(
          screen.getByRole('button', {
            name: new RegExp(enterContactButtonLabel, 'i'),
          })
        );
      });

      it('todo', () => {
        let element;

        element = screen.getByRole('button', { name: new RegExp(submitButtonLabel, 'i') });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();

        expect(
          screen.getByRole('heading', { name: new RegExp('Vos coordonnées', 'i') })
        ).toBeVisible();
        expect(screen.getByText(new RegExp(fakeContact.name))).toBeVisible();
        expect(screen.getByText(new RegExp(fakeContact.address.line1))).toBeVisible();
        expect(screen.getByText(new RegExp(fakeContact.address.line2))).toBeVisible();
        expect(screen.getByText(new RegExp(fakeContact.address.city))).toBeVisible();
        // expect(screen.getByText(new RegExp(fakeContact.phoneNumber))).toBeVisible();

        element = screen.getByRole('button', {
          name: new RegExp(modifyContactButtonLabel, 'i'),
        });
        expect(element).toBeVisible();
        expect(element).not.toBeDisabled();
      });
    });
  });
});
