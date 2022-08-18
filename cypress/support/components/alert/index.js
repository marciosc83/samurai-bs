import { el } from './elements'

class Alert {
    haveText(expectedMessage){
        cy.contains(el.alertError, expectedMessage)
            .should('be.visible')
            .should('have.text',expectedMessage)
    }
}

export default new Alert()