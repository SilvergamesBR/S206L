/// <reference = cypress>
describe("Testes de criacao, registro, login e delete", ()=>{
    it("Teste criacao de usuario com sucesso", ()=>{
        CriarUser()
    })

    it("Teste criacao de usuario com falha", ()=>{
        let hora = new Date().getHours().toString()
        let minuto = new Date().getMinutes().toString()
        let segundo = new Date().getSeconds().toString()
        let ID = hora+minuto+segundo+"ID"
        let EMAIL = hora+minuto+segundo+"@email.com"
        let SENHA = hora+minuto+segundo+"SENHA"
        let infos = [ID,SENHA,EMAIL]

        cy.visit("https://thinking-tester-contact-list.herokuapp.com")
        cy.get('#signup').click()
        cy.get('#firstName').type(ID)
        cy.get('#lastName').type(ID)
        cy.get('#email').type(EMAIL)
        cy.get('#submit').click()
        
        cy.get('#error').should("have.text","User validation failed: password: Path `password` is required.")
    })

    it("Teste de adicionar contato com sucesso", ()=>{
        let infos = CriarUser()

        cy.get('#add-contact').click()

        cy.get('#firstName').type(infos[0])
        cy.get('#lastName').type(infos[0])
        cy.get('#birthdate').type("2002-04-22")
        cy.get('#email').type(infos[2])
        cy.get('#phone').type("1234567890")
        cy.get('#street1').type("Rua 1")
        cy.get('#city').type("SRS")
        cy.get('#stateProvince').type("MG")
        cy.get('#postalCode').type("3754000")
        cy.get('#country').type("Brazil")
        cy.get('#submit').click()

        cy.get('.contactTableBodyRow > :nth-child(4)').should("have.text",infos[2])
    })

    it("Teste de adicionar contato com falha", ()=>{
        let infos = CriarUser()

        cy.get('#add-contact').click()

        cy.get('#firstName').type(infos[0])
        cy.get('#lastName').type(infos[0])
        cy.get('#birthdate').type("2002-04-22")
        cy.get('#email').type(infos[2])
        cy.get('#phone').type("1234567890")
        cy.get('#street1').type("Rua 1")
        cy.get('#city').type("SRS")
        cy.get('#stateProvince').type("MG")
        cy.get('#postalCode').type("37054000")
        cy.get('#country').type("Brazil")
        cy.get('#submit').click()

        cy.get('#error').should("have.text","Contact validation failed: postalCode: Postal code is invalid")
    })

    it("Teste de login com sucesso", ()=>{
        let infos = CriarUser()
        
        cy.get('#logout').click()
        cy.get('#email').type(infos[2])
        cy.get('#password').type(infos[1])
        cy.get('#submit').click()
        cy.get('h1').should("have.text","Contact List")
    })

    it("Teste de login com falha", ()=>{
        let infos = CriarUser()
        
        cy.get('#logout').click()
        cy.get('#email').type(infos[2])
        cy.get('#password').type(infos[1]+"erro")
        cy.get('#submit').click()
        cy.get('#error').should("have.text","Incorrect username or password")
    })

})

function CriarUser(){
    let hora = new Date().getHours().toString()
    let minuto = new Date().getMinutes().toString()
    let segundo = new Date().getSeconds().toString()
    let ID = hora+minuto+segundo+"ID"
    let EMAIL = hora+minuto+segundo+"@email.com"
    let SENHA = hora+minuto+segundo+"SENHA"
    let infos = [ID,SENHA,EMAIL]

    cy.visit("https://thinking-tester-contact-list.herokuapp.com")
    cy.get('#signup').click()
    cy.get('#firstName').type(ID)
    cy.get('#lastName').type(ID)
    cy.get('#email').type(EMAIL)
    cy.get('#password').type(SENHA)
    cy.get('#submit').click()

    cy.get('h1').should("have.text","Contact List")

    return infos
}