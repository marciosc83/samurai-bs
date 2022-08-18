import signupPage from '../support/pages/signup'

describe('Cadastro de usuário', function () {

    before(function(){
        cy.fixture('signup').then(function(signup){
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('Quando o usuário é novato', function () {
        

        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar um novo usuário com sucesso', function () {
            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })


    context('Quando o usuário com o mesmo email já está cadastrado', function () {
        before(function () {
            cy.postUser(this.email_dup)
        })

        it('Não deve cadastrar o novo usuário', function () {
            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é incorreto', function () {
       it('Deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')

        })
    })

    context('Quando a senha é muito curta', function () {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (password) {
            it('Não deve cadastrar o usuário com a senha: ' + password, function () {
                
                this.short_password.password = password

                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })
    })

    context('Quando não preencho nenhum dos campos', function(){
        const expectedMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        expectedMessages.forEach(function(message){
            it('Deve exibir ' + message.toLowerCase(), function(){
                signupPage.alert.haveText(message)
            })
        })
    })
})