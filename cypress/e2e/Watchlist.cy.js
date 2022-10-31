

describe('Smoke test', () => {
//Logging In Before executing the tests
  let value
  before(() => {
    cy.fixture('data_website')
    .then((data) => value = data)

    cy.visit('/')
    
    sessionStorage.clear()
    cy.clearCookies()
    cy.clearLocalStorage()
    
  })
  after(() => {
    //Logging out after all tests has executed
    cy.get('#pt-logout > a > span').click()
    cy.get('.oo-ui-inputWidget-input').click()
      })

  
  it("SigningIn user with valid credentials", function () {
    //Making the user login
    cy.get('#pt-login > a > span').click()
    cy.get('#wpName1').type(value.username)
    cy.get('#wpPassword1').type(value.password)  
    cy.get('#wpLoginAttempt').click()
cy.wait(300)
    //Verfying if the user has reached the Welcome Page
    cy.get('#Welcome_to_Wikipedia').should('have.text', 'Welcome to Wikipedia')


  })


  it("Navigating to first page and adding it in watchlist", function () {
cy.visit('https://en.wikipedia.org/wiki/Tiger')  
    
    cy.wait(3000)
    cy.reload()
    cy.get('.mw-page-title-main').should('have.text','Tiger')
    

    cy.get('#ca-watch > a').click()
    cy.get('#pt-watchlist > a > span').click()
    cy.get('.mw-rcfilters-ui-watchlistTopSectionWidget-editWatchlistButton').click()
    cy.get('[href="/wiki/Tiger"]').should('have.text','Tiger')


  })
  it("Navigating to second page and adding it in watchlist", function () {
    cy.visit('https://en.wikipedia.org/wiki/Lion')

    cy.wait(5000)
    cy.reload()
    cy.get('#ca-watch > a').click()
    cy.get('#pt-watchlist > a > span').click()
    cy.get('.mw-rcfilters-ui-watchlistTopSectionWidget-editWatchlistButton').click()



  })

  it("Deleting First Page from watchlist and verifying if the second page is present in watchlist", function () {
    
    cy.reload()
    cy.get('#ooui-php-1').click()
    cy.get('#ooui-php-11 > .oo-ui-inputWidget-input').click()
    cy.get('#pt-watchlist > a > span').click()
    cy.get('.mw-changeslist-title').should('have.text','Tiger')

  })

  it("Deleting Second Page also so that the whole test case can execute again", function () {
    cy.get('#pt-watchlist > a > span').click()
    cy.get('.mw-rcfilters-ui-watchlistTopSectionWidget-editWatchlistButton').click()
    cy.get('#ooui-php-1').click()
    cy.get('#ooui-php-10 > .oo-ui-inputWidget-input').click()


  })
})