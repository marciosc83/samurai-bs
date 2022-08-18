import { el } from './elements'

class Toast {
    shouldHaveText(expectedMessage) {
        cy.get(el.toast, {timeout: 10000})
            .should('be.visible')
            .find('p')
            .should('have.text', expectedMessage)
    }
}

export default new Toast()