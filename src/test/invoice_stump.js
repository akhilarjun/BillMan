import {Invoice, ACTION_TYPE, CURRENCY_TYPE, Item, Organization, Address, INVOICE_TYPE, AdditionalCharge} from '../model/models';

const DUMMY_RESPONSE = []

export function getResponse() {
    //ITEM1
    let item1 = new Item();
    item1.itemName = 'Apple';
    item1.description = 'Kashmiri Apple';
    item1.quantity = 10;
    item1.unitPrice = 240;
    //ITEM2
    let item2 = new Item();
    item2.itemName = 'Banana';
    item2.description = 'Small Ripe Banana';
    item2.quantity = 50;
    item2.unitPrice = 200;
    //ITEM3
    let item3 = new Item();
    item3.itemName = 'Grapes';
    item3.description = 'Green seedless';
    item3.quantity = 50;
    item3.unitPrice = 40;
    //ITEM4
    let item4 = new Item();
    item4.itemName = 'Cashew Nut';
    item4.description = null;
    item4.quantity = 25;
    item4.unitPrice = 424;
    //Adding all items
    let itemsArray = [];
    itemsArray.push(item1);
    itemsArray.push(item2);
    itemsArray.push(item3);
    itemsArray.push(item4);
    //Parent ORganization Address
    let parentOrgAddress = new Address();
    parentOrgAddress.addressLine1 = 'Flat No - 2c, 2nd Floor';
    parentOrgAddress.addressLine2 = 'Plot No - 7/244, Green Park';
    parentOrgAddress.addressLine3 = 'Belgharia, North 24 Pargana';
    parentOrgAddress.city = 'Kolkatta';
    parentOrgAddress.zipcode = '700056';
    parentOrgAddress.phone = '+919875320019';
    //Parent ORganization
    let parentOrganization = new Organization();
    parentOrganization.organizationName = 'AD Printmech';
    parentOrganization.address = parentOrgAddress;
    //To Organization Address
    let toOrgAddress = new Address();
    toOrgAddress.addressLine1 = '73/1, Elephant Road';
    toOrgAddress.addressLine2 = '4-th Floor';
    toOrgAddress.city = 'Dhaka';
    toOrgAddress.zipcode = '1205';
    toOrgAddress.country = 'Bangladesh';
    //Parent ORganization
    let toOrganization = new Organization();
    toOrganization.organizationName = 'Patriot Global LTD';
    toOrganization.executorName = 'Mr P Debnath';
    toOrganization.address = toOrgAddress;
    //Terms
    let terms = [];
    terms.push('You have to add margin, clearing, handling, duty charges in Dhaka etc extra');
    terms.push('Port of shipment: By air freight from Mumbai/ Kolkata');
    terms.push('Payment: 40% advance along with order and balance before dispatch or through L/C');
    terms.push('This invoice will be valid for next 60days');
    terms.push('Insuarance is to be covered by you');
    terms.push('Freight will be paid by us');
    terms.push('Part shipment is allowed');
    //Additional Charge
    let additionalCharges = [];
    let additionalCharge = new AdditionalCharge();
    additionalCharge.chargeDescription = 'Air Frieght';
    additionalCharge.chargeAmount = 4500;
    additionalCharges.push(additionalCharge);
    //INVOICE
    let invoice1 = new Invoice();
    invoice1.id = 'dummy1';
    invoice1.invoiceNumber = 'INV-1234';
    invoice1.invoiceType = INVOICE_TYPE.PROFORMA;
    invoice1.lastAction = ACTION_TYPE.NEW;
    invoice1.invoiceAmount = 32500;
    invoice1.invoiceCurrency = CURRENCY_TYPE.INR;
    invoice1.expiry = 60;
    invoice1.items = itemsArray;
    invoice1.parentOrg = parentOrganization;
    invoice1.toOrg = toOrganization;
    invoice1.taxPercent = 12;
    invoice1.terms = terms;
    invoice1.additionalCharges = additionalCharges;
    //Preparing Response
    DUMMY_RESPONSE.push(invoice1);
    return DUMMY_RESPONSE;
}