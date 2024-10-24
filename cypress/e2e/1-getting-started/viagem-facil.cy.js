describe('Testes de funcionalidades do site Viagem Fácil', () => {

    // Antes de cada teste, visitamos a página principal
    beforeEach(() => {
      cy.visit('/');
    });
  
    // Cenário 1: Teste de sucesso - Verificação do cálculo do orçamento
    it('Deve calcular o orçamento corretamente quando todos os dados são válidos', () => {
      // Preenche o campo "Valor da passagem" com 500 reais
      cy.get('#valorPassagem').type('500');
      
      // Preenche o campo "Número de pessoas" com 2
      cy.get('#numeroPessoas').type('2');
      
      // Preenche o campo "Dias de hospedagem" com 5 dias
      cy.get('#diasHospedagem').type('5');
      
      // Preenche o campo "Data de nascimento" com uma data válida
      cy.get('#dataNascimento').type('1990-01-01');
      
      // Submete o formulário
      cy.get('#orcamentoForm button[type="submit"]').click();
      
      // Verifica se o resultado do orçamento exibido é o esperado
      cy.get('#resultadoOrcamento').should('contain', 'Orçamento total: R$ 4500.00');
  
      /*
        Explicação:
        - O valor total das passagens: 500 * 2 = 1000
        - Hospedagem: 500 por dia * 5 dias = 2500
        - Soma adicional de R$1000
        - Total esperado: 1000 + 2500 + 1000 = 4500
      */
    });
  
    // Cenário 2: Teste que falha intencionalmente - Verificação de idade inferior a 18 anos
    it('Não deve permitir que menores de 18 anos façam reservas', () => {
      // Preenche o campo "Valor da passagem" com 300 reais
      cy.get('#valorPassagem').type('300');
      
      // Preenche o campo "Número de pessoas" com 3
      cy.get('#numeroPessoas').type('3');
      
      // Preenche o campo "Dias de hospedagem" com 4 dias
      cy.get('#diasHospedagem').type('4');
      
      // Preenche o campo "Data de nascimento" com uma data que indica idade menor que 18 anos
      cy.get('#dataNascimento').type('2010-01-01');
      
      // Submete o formulário
      cy.get('#orcamentoForm button[type="submit"]').click();
  
      // Verifica se o alerta com a mensagem correta é exibido
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Você deve ter pelo menos 18 anos para fazer uma reserva.');
      });
  
      /*
        Explicação:
        - Como a data de nascimento indica que o usuário tem menos de 18 anos,
          o sistema deveria impedir o cálculo do orçamento e exibir um alerta.
      */
    });
  });  