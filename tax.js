"use strict";

const $ = selector => document.querySelector(selector);

const getErrorMsg = lbl => `${lbl} must be a valid number greater than zero.`;
const getErrorMsgTax = lbl => `${lbl} must be a valid number greater than zero and less than 100.`;

const focusAndSelect = selector => {
    const elem = $(selector);
    elem.focus();
    elem.select();
};

const calculateTax = (subtotal, taxRate) => {
    const taxAmount = subtotal * (taxRate / 100);
    return taxAmount;
};

const processEntries = () => {
    const sale = parseFloat($("#sale").value);
    const tax = parseFloat($("#tax").value);

    if (isNaN(sale) || sale <= 0) {
        alert(getErrorMsg("Sales Amount"));
        focusAndSelect("#sale");
    } else if (isNaN(tax) || tax <= 0 || tax >= 100) {
        alert(getErrorMsgTax("Tax Percent"));
        focusAndSelect("#tax");
    } else {
        const formattedTotal = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(sale + calculateTax(sale, tax));

        $("#total").value = formattedTotal;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    $("#calculate").addEventListener("click", processEntries);
    $("#sale").focus(); // focus cursor line 
});
