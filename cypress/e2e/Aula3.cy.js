/// <reference = cypress>
describe("Testes de criacao, registro, login e delete", ()=>{
    it("Teste criacao de usuario com sucesso", ()=>{
        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
        cy.get('.btn-link').click()
        cy.get('#firstName').type("Teste")
        cy.get('#Text1').type("Testilson")
        cy.get('#username').type("Testilson123")
        cy.get('#password').type("SenhaDoTestilson")
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should("contain.text","Registration successful")
    })

    it("Teste criacao de usuario com falha", ()=>{
        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
        cy.get('.btn-link').click()
        cy.get('#firstName').type("Teste")
        cy.get('#Text1').type("Testilson")
        cy.get('#username').type("Testilson123")
        cy.get('.btn-primary').should("be.disabled")
    })

    it("Teste de login com sucesso", ()=>{
        let infos = CriarUser()
        
        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('div.ng-scope > :nth-child(2)').should("have.text","You're logged in!!")

    })

    it("Teste de delete", ()=>{
        let infos = CriarUser()

        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('div.ng-scope > :nth-child(2)').should("have.text","You're logged in!!")

        cy.get('.ng-binding > a').click()
        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should("have.text","Username or password is incorrect")

    })
})

function CriarUser(){
    let hora = new Date().getHours().toString()
    let minuto = new Date().getMinutes().toString()
    let segundo = new Date().getSeconds().toString()
    let ID = hora+minuto+segundo+"ID"
    let SENHA = hora+minuto+segundo+"SENHA"
    let infos = [ID,SENHA]

    cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
    cy.get('.btn-link').click()
    cy.get('#firstName').type(ID)
    cy.get('#Text1').type(ID)
    cy.get('#username').type(ID)
    cy.get('#password').type(SENHA)
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text","Registration successful")
    
    return infos
}