import fpPage from '../support/pages/forgotpass'

describe('Resgate de senha', function(){
    before(function(){
        cy.fixture('recovery').then(function(recovery){
            this.data = recovery
        })
    })

    context('Quando o usuário esquece a senha', function(){
        before(function(){
            cy.postUser(this.data)
        })

        it('Deve poder resgatar por email', function(){
            fpPage.go()
            fpPage.form(this.data.email)
            fpPage.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação da senha, cheque sua caixa de entrada'
            fpPage.toast.shouldHaveText(message)
            cy.wait(7000)
        })
    })

    context('Quando o usuário solicita o resgate', function(){

        before(function(){
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it('Deve poder cadastrar uma nova senha', function(){
            console.log(Cypress.env('recoveryToken'))
        })
    })
})