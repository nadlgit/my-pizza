import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { regexEscape } from 'shared/utils/test-utils';

import { Order } from './order';
import { PIZZA_BASES } from 'data/bases';
import { PIZZA_INGREDIENTS } from 'data/ingredients';

describe('Order component', () => {
  const testBase = PIZZA_BASES.filter((item, idx) => idx !== 0)[0];
  const testIngredients = [...PIZZA_INGREDIENTS];

  async function step1toStep2(userEvt: ReturnType<typeof userEvent.setup>, withSelection = false) {
    if (withSelection) {
      await userEvt.click(
        screen.getByRole('radio', {
          name: regexEscape(testBase.title),
        })
      );
      testIngredients.forEach(async (item) => {
        await userEvt.click(
          screen.getByRole('checkbox', {
            name: regexEscape(item.title),
          })
        );
      });
    }
    await userEvt.click(
      screen.getByRole('button', {
        name: regexEscape('Continuer', true),
      })
    );
  }

  async function step2toStep3(userEvt: ReturnType<typeof userEvent.setup>) {
    await userEvt.click(
      screen.getByRole('button', {
        name: regexEscape('Valider', true),
      })
    );
  }

  describe('at step 1', () => {
    beforeEach(() => {
      render(<Order />);
    });

    it('should have first base initially selected', () => {
      expect(screen.getByRole('radio', { name: regexEscape(PIZZA_BASES[0].title) })).toBeChecked();
    });

    it('should have no ingredients initially selected', () => {
      PIZZA_INGREDIENTS.forEach((item) => {
        expect(screen.getByRole('checkbox', { name: regexEscape(item.title) })).not.toBeChecked();
      });
    });
  });

  describe('at step 2', () => {
    let userEvt = userEvent.setup();

    beforeEach(async () => {
      userEvt = userEvent.setup();
      render(<Order />);
    });

    it('should have pick-up initially selected', async () => {
      await step1toStep2(userEvt);
      expect(
        screen.getByRole('radio', { name: regexEscape('Retrait sur place', true) })
      ).toBeChecked();
    });

    it('should have contact initially missing', async () => {
      await step1toStep2(userEvt);
      await userEvt.click(
        screen.getByRole('radio', {
          name: regexEscape('Livraison', true),
        })
      );
      expect(screen.getByText(regexEscape('Veuillez saisir vos coordonnées', true))).toBeVisible();
    });

    it('should display base and ingredients previously selected', async () => {
      await step1toStep2(userEvt, true);
      expect(screen.getByText(regexEscape(testBase.title))).toBeVisible();
      testIngredients.forEach((item) => {
        expect(screen.getByText(regexEscape(item.title))).toBeVisible();
      });
    });
  });

  describe.skip('at step 3', () => {
    let userEvt = userEvent.setup();

    beforeEach(async () => {
      userEvt = userEvent.setup();
      render(<Order />);
    });

    it.skip('should have complete order information', async () => {
      await step1toStep2(userEvt);
      await step2toStep3(userEvt);
    });
  });
});
