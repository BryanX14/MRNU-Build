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
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.example.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
