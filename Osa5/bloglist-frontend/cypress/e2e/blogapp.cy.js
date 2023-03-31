/* eslint-disable no-undef */
describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Gary Oak',
      username: 'go90',
      password: 'salainen'
    }
    const user2 = {
      name: 'Zack Fair',
      username: 'zf88',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/users', user2)

  })


  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function(){
      cy.get('input:first').type('go90')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
    })

    it('fails with wrong credentials', function(){
      cy.get('input:first').type('go90')
      cy.get('input:last').type('wrong')
      cy.contains('login').click()
      cy.contains('wrong username or password')
    })

  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.get('input:first').type('go90')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
    })

    it('a new blog can be created and liked', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('A blog')
      cy.get('#author').type('Blogger')
      cy.get('#url').type('www.blog.com')
      cy.contains('create').click()
      cy.contains('A blog Blogger')

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes').contains('1')

    })


    it('a blog can be removed', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('A blog')
      cy.get('#author').type('Blogger')
      cy.get('#url').type('www.blog.com')
      cy.contains('create').click()
      cy.contains('A blog Blogger')

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('A blog Blogger').should('not.exist')

    })
    it('blogs are in order', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('A blog')
      cy.get('#author').type('Blogger')
      cy.get('#url').type('www.blog.com')
      cy.contains('create').click()
      cy.contains('A blog Blogger')

      cy.get('#login-button').click()
      cy.get('#title').clear()
      cy.get('#author').clear()
      cy.get('#url').clear()
      cy.get('#title').type('Testing')
      cy.get('#author').type('Tester')
      cy.get('#url').type('www.test.com')
      cy.contains('create').click()
      cy.contains('Testing Tester')
      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.get('.blog').eq(1).should('contain', 'blog')
      cy.get('.blog').eq(0).should('contain', 'Testing')
      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.get('.blog').eq(0).should('contain', 'blog')
      cy.get('.blog').eq(1).should('contain', 'Testing')

    })
    it('non-adder cannot see the remove button', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('A blog')
      cy.get('#author').type('Blogger')
      cy.get('#url').type('www.blog.com')
      cy.contains('create').click()
      cy.contains('A blog Blogger')
      cy.contains('log out').click()
      cy.get('input:first').type('zf88')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.get('.blog').eq(0).contains('view').click()
      cy.contains('remove').should('not.exist')
    })
  })


})