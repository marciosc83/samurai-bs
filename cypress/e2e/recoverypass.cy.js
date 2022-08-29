import fpPage from '../support/pages/forgotpass'
import rpPage from '../support/pages/resetpass'

describe('Resgate de senha', function () {
    before(function () {
        cy.fixture('recovery').then(function (recovery) {
            this.data = recovery
        })
    })

    context('Quando o usuário esquece a senha', function () {
        before(function () {
            cy.postUser(this.data)
        })

        it('Deve poder resgatar por email', function () {
            fpPage.go()
            fpPage.form(this.data.email)
            fpPage.submit()

            const expectedMessage = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            fpPage.toast.shouldHaveText(expectedMessage)
            cy.wait(7000)
        })
    })

    context('Quando o usuário solicita o resgate', function () {

        before(function () {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it('Deve poder cadastrar uma nova senha', function () {
            const token = Cypress.env('recoveryToken')
            rpPage.go(token)
            rpPage.form('pwd123', 'pwd123')
            rpPage.submit()

            const expectedMessage = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.toast.shouldHaveText(expectedMessage)
        })
    })
})