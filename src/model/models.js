/**
 * Invoice Class
 * 
 * @author Akhil Arjun
 * 
 */
export class Invoice {
    constructor() {
        this.invoiceNumber = '';
        this.id = '';
        this.invoiceAmount = 0;
        this.invoiceCurrency = '';
        this.invoiceType = '';
        this.lastAction = '';
        this.parentOrg = new Organization();
        this.toOrg = new Organization();
        this.expiry = 0;
        this.items = [Item];
        this.taxPercent = 0;
        this.additionalCharges = [AdditionalCharge];
        this.invoiceDate = new Date();
        this.lastUpdated = new Date();
        this.terms = [];
    }
}

/**
 * Items Class
 * 
 * @author Akhil Arjun
 */
export class Item {
    constructor() {
        this.itemName = '';
        this.description = '';
        this.quantity = 0;
        this.unitPrice = 0;
    }
}

/**
 * Organization Class
 * 
 * @author Akhil Arjun
 */
export class Organization {
    constructor() {
        this.organizationName = '';
        this.executorName = '';
        this.address = new Address();
    }
}

/**
 * Address Class
 * 
 * @author Akhil Arjun
 */
export class Address {
    constructor() {
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.addressLine3 = '';
        this.city = '';
        this.state = '';
        this.zipcode = '';
        this.country = '';
        this.phone = '';
        this.phoneAlternate = '';
    }
}

/**
 * Invoice Types
 * 
 * @author Akhil Arjun
 */
export const INVOICE_TYPE = {
    PROFORMA: 'Proforma Invoice',
    CONCRETE: 'Invoice'
}

/**
 * Additional Charges Class
 * 
 * @author Akhil Arjun
 */
export class AdditionalCharge {
    constructor() {
        this.chargeDescription = '';
        this.chargeAmount = '';
    }
}

/**
 * Action Types
 * 
 * @author Akhil Arjun
 */
export const ACTION_TYPE = {
    NEW: 'New',
    STARTED: 'Started',
    NEGOTIATING: 'Negotiating',
    EXPIRED: 'Expired',
    CLOSED: 'Closed',
    PAID: 'Paid',
    PARTIALLY_PAID: 'Partially Paid'
}

/**
 * Currency Types
 * 
 * @author Akhil Arjun
 */
export const CURRENCY_TYPE = {
    DOLLAR: '$',
    INR: 'Rs'
}