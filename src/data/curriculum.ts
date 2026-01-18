export interface Lesson {
    id: string;
    title: string;
    description: string;
    content: string;
    codeExample?: string;
    concepts?: {
        title: string;
        items: string[];
    };
    translateKey: string;
}

export interface Level {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    translateKey: string;
}

export const curriculum: Level[] = [
    {
        id: 'introduction',
        title: 'Introduction & Installation',
        description: 'Get started with Cypress testing fundamentals',
        translateKey: 'levels.introduction',
        lessons: [
            {
                id: 'intro_what_is_cypress',
                title: 'What is Cypress?',
                description: 'Learn about Cypress and why it\'s a powerful testing framework',
                content: 'Cypress is a next-generation front-end testing tool built for the modern web.',
                translateKey: 'lessons.intro_what_is_cypress',
                codeExample: `// Example: A simple Cypress test
describe('My First Test', () => {
  it('Visits the app', () => {
    cy.visit('https://example.com')
    cy.contains('Example Domain')
  })
})`
            },
            {
                id: 'intro_installation',
                title: 'Installation & Setup',
                description: 'Install Cypress and configure your first project',
                content: 'Setting up Cypress is straightforward.',
                translateKey: 'lessons.intro_installation',
                codeExample: `// Install Cypress
npm install --save-dev cypress

// Open Cypress
npx cypress open`
            },
            {
                id: 'intro_first_test',
                title: 'Your First Test',
                description: 'Write and run your first Cypress test',
                content: 'Let\'s create a simple test to verify that a page loads correctly.',
                translateKey: 'lessons.intro_first_test',
                codeExample: `describe('My First Test', () => {
  it('loads the homepage', () => {
    cy.visit('/')
    cy.get('h1').should('be.visible')
    cy.title().should('include', 'My App')
  })
})`
            }
        ]
    },
    {
        id: 'selectors',
        title: 'Basic Selectors',
        description: 'Learn how to find and select elements',
        translateKey: 'levels.selectors',
        lessons: [
            {
                id: 'selectors_get',
                title: 'Using cy.get()',
                description: 'Select elements using CSS selectors',
                content: 'cy.get() is the most fundamental command in Cypress.',
                translateKey: 'lessons.selectors_get',
                codeExample: `// Select by tag, class, or ID
cy.get('button')
cy.get('.submit-button')
cy.get('#login-form')

// Select by attribute
cy.get('[data-testid="user-name"]')
cy.get('[type="email"]')`
            },
            {
                id: 'selectors_contains',
                title: 'Using cy.contains()',
                description: 'Find elements by their text content',
                content: 'cy.contains() allows you to select elements based on their text content.',
                translateKey: 'lessons.selectors_contains',
                codeExample: `// Find by text
cy.contains('Submit')
cy.contains('button', 'Submit')

// Case sensitive
cy.contains('Login').click()`
            },
            {
                id: 'selectors_find',
                title: 'Using .find()',
                description: 'Search within previously selected elements',
                content: 'The .find() command searches for descendant elements.',
                translateKey: 'lessons.selectors_find',
                codeExample: `// Find within a parent
cy.get('.user-list')
  .find('.user-item')
  .first()
  .click()

// Chain multiple finds
cy.get('form')
  .find('input[type="text"]')
  .type('Hello')`
            }
        ]
    },
    {
        id: 'interaction',
        title: 'Interacting with Elements',
        description: 'Master element interactions and commands',
        translateKey: 'levels.interaction',
        lessons: [
            {
                id: 'interaction_click',
                title: 'Clicking Elements',
                description: 'Learn how to click buttons and links',
                content: 'The .click() command simulates a user clicking on an element.',
                translateKey: 'lessons.interaction_click',
                codeExample: `// Simple click
cy.get('button').click()

// Click with options
cy.get('.menu-item').click({ force: true })
cy.get('.link').dblclick()

// Right click
cy.get('.context-menu').rightclick()`
            },
            {
                id: 'interaction_type',
                title: 'Typing Text',
                description: 'Input text into form fields',
                content: 'The .type() command simulates a user typing.',
                translateKey: 'lessons.interaction_type',
                codeExample: `// Type text
cy.get('#email').type('user@example.com')

// Type with special characters
cy.get('#password').type('myP@ssw0rd{enter}')

// Clear and type
cy.get('#search').clear().type('Cypress')`
            },
            {
                id: 'interaction_check',
                title: 'Checkboxes & Radio Buttons',
                description: 'Interact with checkboxes and radio buttons',
                content: 'Use .check() and .uncheck() for checkboxes.',
                translateKey: 'lessons.interaction_check',
                codeExample: `// Check a checkbox
cy.get('#agree-terms').check()

// Uncheck
cy.get('#newsletter').uncheck()

// Check multiple by value
cy.get('[type="checkbox"]').check(['option1', 'option2'])`
            },
            {
                id: 'interaction_select',
                title: 'Select Dropdowns',
                description: 'Work with dropdown select elements',
                content: 'The .select() command for dropdown elements.',
                translateKey: 'lessons.interaction_select',
                codeExample: `// Select by text
cy.get('select').select('Option 1')

// Select by value
cy.get('#country').select('us')

// Select by index
cy.get('select').select(0)`
            }
        ]
    },
    {
        id: 'assertions',
        title: 'Assertions',
        description: 'Verify and validate application behavior',
        translateKey: 'levels.assertions',
        lessons: [
            {
                id: 'assertions_should',
                title: 'Basic Assertions with .should()',
                description: 'Verify element properties and states',
                content: 'The .should() command creates assertions.',
                translateKey: 'lessons.assertions_should',
                codeExample: `// Visibility assertions
cy.get('.header').should('be.visible')
cy.get('.modal').should('not.exist')

// Text assertions
cy.get('h1').should('contain', 'Welcome')
cy.get('.error').should('have.text', 'Invalid input')

// Attribute assertions
cy.get('input').should('have.attr', 'type', 'email')
cy.get('button').should('be.disabled')`
            },
            {
                id: 'assertions_expect',
                title: 'Using expect()',
                description: 'Traditional BDD-style assertions',
                content: 'expect() provides traditional assertion syntax.',
                translateKey: 'lessons.assertions_expect',
                codeExample: `// Use with .then()
cy.get('.user-count').then(($el) => {
  const count = parseInt($el.text())
  expect(count).to.be.greaterThan(0)
  expect(count).to.be.lessThan(100)
})

// Multiple expectations
cy.wrap({ name: 'Cypress' }).then((obj) => {
  expect(obj).to.have.property('name')
  expect(obj.name).to.equal('Cypress')
})`
            },
            {
                id: 'assertions_visibility',
                title: 'Visibility Assertions',
                description: 'Test element visibility states',
                content: 'Verify if elements are visible, hidden, or exist.',
                translateKey: 'lessons.assertions_visibility',
                codeExample: `// Visibility checks
cy.get('.toast').should('be.visible')
cy.get('.loading').should('not.be.visible')

// Existence checks
cy.get('.user-profile').should('exist')
cy.get('.error-message').should('not.exist')

// Combined assertions
cy.get('button')
  .should('be.visible')
  .and('be.enabled')
  .and('contain', 'Submit')`
            }
        ]
    },
    {
        id: 'advanced',
        title: 'Advanced Integration Testing',
        description: 'Network requests, API mocking, and more',
        translateKey: 'levels.advanced',
        lessons: [
            {
                id: 'advanced_intercept',
                title: 'Network Interception',
                description: 'Mock and spy on network requests',
                content: 'cy.intercept() allows you to stub and modify network requests.',
                translateKey: 'lessons.advanced_intercept',
                codeExample: `// Intercept and stub API call
cy.intercept('GET', '/api/users', {
  statusCode: 200,
  body: [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]
}).as('getUsers')

// Wait for the request
cy.wait('@getUsers')

// Intercept with fixture
cy.intercept('POST', '/api/login', {
  fixture: 'user.json'
})`
            },
            {
                id: 'advanced_fixtures',
                title: 'Using Fixtures',
                description: 'Load test data from external files',
                content: 'Fixtures store test data in separate files.',
                translateKey: 'lessons.advanced_fixtures',
                codeExample: `// Load fixture data
cy.fixture('users.json').then((users) => {
  cy.intercept('GET', '/api/users', users)
})

// Use fixture directly
cy.intercept('GET', '/api/profile', {
  fixture: 'profile.json'
})

// Modify fixture data
cy.fixture('user').then((user) => {
  user.email = 'newemail@example.com'
  cy.intercept('POST', '/api/user', user)
})`
            },
            {
                id: 'advanced_custom_commands',
                title: 'Custom Commands',
                description: 'Create reusable test commands',
                content: 'Custom commands create reusable functions.',
                translateKey: 'lessons.advanced_custom_commands',
                codeExample: `// Define custom command (in support/commands.js)
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('button[type="submit"]').click()
})

// Use custom command
cy.login('user@example.com', 'password123')

// Custom command with assertion
Cypress.Commands.add('checkToast', (message) => {
  cy.get('.toast').should('be.visible').and('contain', message)
})`
            }
        ]
    }
];
