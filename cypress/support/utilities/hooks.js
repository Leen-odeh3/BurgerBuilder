export const loginSetup = () => {
    return cy.fixture("loginData").then((data)=>{
        cy.wrap(data).as('userData')
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
});
};

export const registrationSetup = () => {
    return cy.fixture('loginData').then((data) => {
        cy.wrap(data).as('userData');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
    });
};


export const ExistingEmail = () => {
    return cy.fixture("loginData").then((data) => {
        cy.wrap(data).as('userData');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
    });
};
