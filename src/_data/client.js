module.exports = {
    name: "Maple Ridge New and Used Building Materials INC.",
    email: "mrnu@shaw.ca",
    phoneForTel: "604-380-2111",
    phoneFormatted: "(604) 380-2111",
    address: {
        lineOne: "23332 River Road",
        city: "Maple Ridge",
        state: "BC",
        zip: "V2W 1B6",
        country: "CA",
        mapLink: "https://maps.app.goo.gl/hfGVFDisHCx69MhW7",
    },
    socials: {
        facebook: "https://www.facebook.com/profile.php?id=100057334754351",
        instagram: "https://www.instagram.com/mrnu.inc?fbclid=IwY2xjawTF43xleHRuA2FlbQIxMABicmlkETF4YVNKcDJQQVNZMnY2MHFuc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHol4gaU_xTKpL0XXymvY7MmTBKwSyX9qNlE7GrkfgqVL2dLpIovOKCQpzHeH_aem_CtRe7dhk2-Es54pRBjQfeg",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://mrnu.ca",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
