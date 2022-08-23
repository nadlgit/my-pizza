import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { ContactModal } from './contact-modal';
import { Modal } from 'shared/components/modal';

import type { ReactPortal } from 'react';
import type { Order } from 'data/model';

jest.mock('shared/components/modal');
const mockModal = Modal as jest.MockedFunction<typeof Modal>;
mockModal.mockImplementation(({ isOpen, close, children }) => {
  return (<>{isOpen ? children : null}</>) as ReactPortal;
});

type Contact = Required<Order>['contact'];
function cloneContact(contact: Contact) {
  return {
    ...contact,
    address: { ...contact?.address },
  } as Contact;
}

describe('ContactModal component', () => {
  const testContact1 = {
    name: 'Jane Summers',
    address: { line1: 'somewhere', line2: 'and then', city: 'London' },
    phoneNumber: '(0) 911 7777',
  };
  const testContact2 = {
    name: 'Alex Baba',
    address: { line1: 'abcd efgh ijkl', city: 'Paris' },
    phoneNumber: '01-45-88-99-33',
  };

  const getCancelBtnElt = () => screen.getByRole('button', { name: 'Annuler' });
  const getSubmitBtnElt = () => screen.getByRole('button', { name: 'Valider' });

  const getNameElt = () => screen.getByLabelText(/Nom/, { selector: 'input' });
  const getAddrLine1Elt = () => screen.getByLabelText(/Adresse/, { selector: 'input' });
  const getAddrLine2Elt = () =>
    screen.getByLabelText(/Complément d'adresse/, { selector: 'input' });
  const getCityElt = () => screen.getByLabelText(/Ville/, { selector: 'input' });
  const getPhoneElt = () => screen.getByLabelText(/Téléphone/i, { selector: 'input' });

  let userEvt = userEvent.setup();

  it.each([
    ['undefined', undefined],
    ['contact1', cloneContact(testContact1)],
    ['contact2', cloneContact(testContact2)],
  ])('should initialize inputs with contact props: %s', async (testLabel, contact) => {
    const testProps = {
      isOpen: true,
      contact: contact ? cloneContact(contact) : undefined,
      onChange: jest.fn(),
      onClose: jest.fn(),
    };
    await act(async () => {
      render(<ContactModal {...testProps} />);
    });

    expect(getNameElt()).toHaveDisplayValue(testProps.contact?.name ?? '');
    expect(getAddrLine1Elt()).toHaveDisplayValue(testProps.contact?.address?.line1 ?? '');
    expect(getAddrLine2Elt()).toHaveDisplayValue(testProps.contact?.address?.line2 ?? '');
    expect(getCityElt()).toHaveDisplayValue(testProps.contact?.address?.city ?? '');
    expect(getPhoneElt()).toHaveDisplayValue(testProps.contact?.phoneNumber ?? '');
  });

  it('should handle cancellation', async () => {
    const testProps = {
      isOpen: true,
      contact: undefined,
      onChange: jest.fn(),
      onClose: jest.fn(),
    };
    userEvt = userEvent.setup();
    await act(async () => {
      render(<ContactModal {...testProps} />);
    });

    await userEvt.click(getCancelBtnElt());

    expect(testProps.onChange).not.toHaveBeenCalled();
    expect(testProps.onClose).toHaveBeenCalled();
  });

  it.each([
    ['contact1', cloneContact(testContact1)],
    ['contact2', cloneContact(testContact2)],
  ])('should handle submission with valid data: %s', async (testLabel, contact) => {
    const testProps = {
      isOpen: true,
      contact: undefined,
      onChange: jest.fn(),
      onClose: jest.fn(),
    };
    userEvt = userEvent.setup();
    await act(async () => {
      render(<ContactModal {...testProps} />);
    });

    await userEvt.type(getNameElt(), contact.name);
    await userEvt.type(getAddrLine1Elt(), contact.address.line1);
    contact.address?.line2 && (await userEvt.type(getAddrLine2Elt(), contact.address.line2));
    await userEvt.type(getCityElt(), contact.address.city);
    await userEvt.type(getPhoneElt(), contact.phoneNumber);

    expect(getSubmitBtnElt()).not.toBeDisabled();
    await userEvt.click(getSubmitBtnElt());

    expect(testProps.onChange).toHaveBeenCalledWith(contact);
    expect(testProps.onClose).toHaveBeenCalled();
  });

  it('should handle submission with invalid data', async () => {
    const testProps = {
      isOpen: true,
      contact: undefined,
      onChange: jest.fn(),
      onClose: jest.fn(),
    };
    userEvt = userEvent.setup();
    await act(async () => {
      render(<ContactModal {...testProps} />);
    });

    expect(getSubmitBtnElt()).toBeDisabled();
    await userEvt.click(getSubmitBtnElt());

    expect(testProps.onChange).not.toHaveBeenCalled();
    expect(testProps.onClose).not.toHaveBeenCalled();
  });
});
