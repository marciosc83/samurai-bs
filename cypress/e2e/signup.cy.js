import signupPage from '../support/pages/signup'

describe('Cadastro de usuário', function () {

    context('Quando o usuário é novato', function () {
        const user = {
            name: 'Marcio Cypress',
            email: 'marcio@email.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar um novo usuário com sucesso', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })


    context('Quando o usuário com o mesmo email já está cadastrado', function () {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('Não deve cadastrar o novo usuário', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é incorreto', function () {
        const user = {
            name: 'Elsabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }

        it('Deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.shouldHaveText('Informe um email válido')

        })
    })

    context('Quando a senha é muito curta', function () {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (password) {
            it('Não deve cadastrar o usuário com a senha: ' + password, function () {
                const user = {
                    name: 'Jason Bundy',
                    email: 'bundy@yahoo.com',
                    password: password
                }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.shouldHaveText('Pelo menos 6 caracteres')
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
                signupPage.shouldHaveText(message)
            })
        })
    })
})