/// <reference types="cypress"/>
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtosPage.visitarUrl()
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    //Adiciona o primeiro produto no carrinho
    cy.fixture('produtos').then(dados => {
      produtosPage.visitarProduto(dados[0].nomeProduto)
      produtosPage.addProdutoCarrinho(
        dados[0].tamanho, 
        dados[0].cor, 
        dados[0].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
    })

    //Adiciona o segundo produto no carrinho
    cy.fixture('produtos').then(dados => {
      produtosPage.visitarProduto(dados[1].nomeProduto)
      produtosPage.addProdutoCarrinho(
        dados[1].tamanho, 
        dados[1].cor, 
        dados[1].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
    })

    //Adiciona o terceiro produto no carrinho
    cy.fixture('produtos').then(dados => {
      produtosPage.visitarProduto(dados[2].nomeProduto)
      produtosPage.addProdutoCarrinho(
        dados[2].tamanho, 
        dados[2].cor, 
        dados[2].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
    })

    //Adiciona o quarto produto no carrinho
    cy.fixture('produtos').then(dados => {
      produtosPage.visitarProduto(dados[3].nomeProduto)
      produtosPage.addProdutoCarrinho(
        dados[3].tamanho, 
        dados[3].cor, 
        dados[3].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)
    })

    //Checkout
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
    cy.get('.showlogin').click()

    //Login no checkout
    cy.fixture('perfil').then(dadosLogin => {
      cy.get('#username').type(dadosLogin.usuario)
      cy.get('#password').type(dadosLogin.senha)
      cy.get('.woocommerce-button').click()
    })

    //Finalização
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.get('.page-title').should('contain', 'Obrigado. Seu pedido foi recebido.')

  });

})