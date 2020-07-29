import { Invoice } from "../model/models";
import { $el, $ } from "./elements";

const cleanStr = (str, after, before) => {
    before = before? before: '';
    after = after?after: '';
    return str? `${before}${str}${after}`: '';
}

const getDueDate = (date, extension) => {
    let d = new Date(date);
    d.setDate(d.getDate() + extension);
    return d.toDateString();
}

/**
 * 
 * @param {Invoice} invoice 
 */
const passInfoToViewer = (invoice) => {
    Array.from(document.querySelectorAll('.invoice-card')).forEach(
        card => {
            if (card.id === invoice.id) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        }
    );

    $('invoiceNumberHolder').textContent = invoice.invoiceNumber;
    $('parentOrgName').textContent = invoice.parentOrg.organizationName;
    $('parentOrgAddrL1').textContent = cleanStr(invoice.parentOrg.address.addressLine1,',');
    $('parentOrgAddrL2').textContent = cleanStr(invoice.parentOrg.address.addressLine2,',');
    $('parentOrgAddrL3').textContent = cleanStr(invoice.parentOrg.address.addressLine3,',');
    $('parentOrgAddrCity').textContent = cleanStr(invoice.parentOrg.address.city,' ');
    $('parentOrgAddrState').textContent = cleanStr(invoice.parentOrg.address.state);
    $('parentOrgAddrZip').textContent = cleanStr(invoice.parentOrg.address.zipcode, '', ' - ');
    $('parentOrgCountry').textContent = cleanStr(invoice.parentOrg.address.country);
    $('parentOrgAddrPhone').textContent = cleanStr(invoice.parentOrg.address.phone);
    $('parentOrgAddrPhoneAlternate').textContent = cleanStr(invoice.parentOrg.address.phoneAlternate);
    $('invoiceDate').textContent = new Date(invoice.invoiceDate).toDateString();
    $('invoiceType').textContent = invoice.invoiceType;
    $('invoiceNumber').textContent = invoice.invoiceNumber;
    $('invoiceAmount').textContent = `${invoice.invoiceCurrency} ${invoice.invoiceAmount.toLocaleString()}`;
    $('toOrgExecutor').textContent = cleanStr(invoice.toOrg.executorName, ',');
    $('toOrgName').textContent = cleanStr(invoice.toOrg.organizationName);
    $('toOrgAddrL1').textContent = cleanStr(invoice.toOrg.address.addressLine1,',');
    $('toOrgAddrL2').textContent = cleanStr(invoice.toOrg.address.addressLine2,',');
    $('toOrgAddrL3').textContent = cleanStr(invoice.toOrg.address.addressLine3,',');
    $('toOrgAddrCity').textContent = cleanStr(invoice.toOrg.address.city,' ');
    $('toOrgAddrState').textContent = cleanStr(invoice.toOrg.address.state);
    $('toOrgAddrZip').textContent = cleanStr(invoice.toOrg.address.zipcode, '', ' - ');
    $('toOrgCountry').textContent = cleanStr(invoice.toOrg.address.country);
    $('toOrgAddrPhone').textContent = cleanStr(invoice.toOrg.address.phone);
    $('toOrgAddrPhoneAlternate').textContent = cleanStr(invoice.toOrg.address.phoneAlternate);
    $('invoiceDueDate').textContent = getDueDate(invoice.invoiceDate, invoice.expiry);

    let tableBody = document.querySelector('#itemTable tbody');
    let total = 0, taxValue = 0, addCharge = 0;
    invoice.items.forEach((item, index) => {
        let tr = $el('tr');
        let td1 = $el('td');
        td1.textContent = index+1;
        let td2 = $el('td');
        td2.textContent = `${item.itemName}${cleanStr(item.description, '', ' - ')}`;
        let td3 = $el('td', 'right-text');
        td3.textContent = item.quantity;
        let td4 = $el('td', 'right-text');
        td4.textContent = item.unitPrice;
        let td5 = $el('td', 'right-text');
        let rowTotal = item.unitPrice*item.quantity;
        td5.textContent = rowTotal;
        total += rowTotal;
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tableBody.append(tr);
    });

    let totalTr = $el('tr');
    let totalLabelTd = $el('td', 'right-text');
    totalLabelTd.textContent = 'Total';
    totalLabelTd.setAttribute('colspan', 4);
    let totalValueTd = $el('td', 'right-text');
    totalValueTd.textContent = `${invoice.invoiceCurrency} ${total}`;
    totalTr.append(totalLabelTd);
    totalTr.append(totalValueTd);
    tableBody.append(totalTr);

    if (invoice.taxPercent && invoice.taxPercent > 0) {
        let taxTr = $el('tr');
        let taxLabelTd = $el('td', 'right-text');
        taxLabelTd.textContent = 'Tax';
        taxLabelTd.setAttribute('colspan', 4);
        let taxValueTd = $el('td', 'right-text');
        taxValue = total/100*invoice.taxPercent;
        taxValueTd.textContent = `${invoice.invoiceCurrency} ${taxValue}`;
        taxTr.append(taxLabelTd);
        taxTr.append(taxValueTd);
        tableBody.append(taxTr);
    }

    invoice.additionalCharges.forEach(additionalCharge => {
        let tr = $el('tr');
        let td1 = $el('td', 'right-text');
        td1.setAttribute('colspan', 4)
        td1.textContent = additionalCharge.chargeDescription;
        let td2 = $el('td', 'right-text');
        td2.textContent = `${invoice.invoiceCurrency} ${additionalCharge.chargeAmount}`;
        addCharge += additionalCharge.chargeAmount;
        tr.append(td1);
        tr.append(td2);
        tableBody.append(tr);
    });

    let grandTotalTr = $el('tr');
    let grandTotalLabelTd = $el('td', 'right-text');
    grandTotalLabelTd.textContent = 'Grand Total';
    grandTotalLabelTd.setAttribute('colspan', 4);
    let grandTotalValueTd = $el('td', 'right-text');
    grandTotalValueTd.textContent = `${invoice.invoiceCurrency} ${total+taxValue+addCharge}`;
    grandTotalTr.append(grandTotalLabelTd);
    grandTotalTr.append(grandTotalValueTd);
    tableBody.append(grandTotalTr);

    let termsAndCondition = document.querySelector('#termsAndCondition ol');
    invoice.terms.forEach(term => {
        let li = $el('li');
        li.textContent = term;
        termsAndCondition.append(li);
    });

}

/**
 * @param {Invoice} invoice 
 */
const getInvoiceCard = (invoice) => {
    let invoiceCard = $el('div', 'invoice-card');
    let label = $el('div', 'invoice-to-label');
    label.textContent = invoice.toOrg.organizationName;
    let amount = $el('div', 'invoice-amount');
    amount.textContent = `${invoice.invoiceCurrency} ${invoice.invoiceAmount.toLocaleString()}`;
    let invoiceNumber = $el('div', 'invoice-number');
    invoiceNumber.textContent = invoice.invoiceNumber;
    let action = $el('div', 'invoice-last-action');
    action.textContent = invoice.lastAction;
    invoiceCard.append(label);
    invoiceCard.append(amount);
    invoiceCard.append(invoiceNumber);
    invoiceCard.append(action);

    invoiceCard.id = invoice.id;
    invoiceCard.onclick = () => passInfoToViewer(invoice);

    return invoiceCard;
}

/**
 * Render Invoice HTML
 * 
 * @author Akhil Arjun
 * 
 * @param {Invoice[]} invoices 
 */
function render(invoices) {
    const invoiceListHolder = document.getElementById('invoiceListHolder');
    invoices.forEach(invoice => {
        invoiceListHolder.append(getInvoiceCard(invoice));
    });
    passInfoToViewer(invoices[0]);
}

export const INVOICES = {
    renderList: render
}