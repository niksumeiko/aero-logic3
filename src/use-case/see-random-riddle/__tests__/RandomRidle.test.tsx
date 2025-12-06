import { App } from '../../../App';

describe('Random riddle', () => {
    it('see random riddle', () => {
        cy.intercept('GET', '**/riddles', {
            body: [
                {
                    id: 'RIDDLE_ID',
                    contents: 'My riddle contents',
                    answers: [
                        { id: 'x', text: 'XXX' },
                        { id: 'y', text: 'YYY' },
                    ],
                },
            ],
        });
        cy.intercept('GET', '**/riddles/RIDDLE_ID', {
            body: {
                id: 'RIDDLE_ID',
                contents: 'My riddle contents',
                answers: [
                    { id: 'x', text: 'XXX' },
                    { id: 'y', text: 'YYY' },
                ],
            },
        });

        cy.mount(<App />, '/?sessionId=z');

        cy.getByTestId('work-interval').should('be.visible');
        cy.getByTestId('timestamp').should('be.visible');

        cy.getByTestId('random-riddle-control').click();

        cy.url().should('include', '/riddle/RIDDLE_ID');
        cy.contains('My riddle contents').should('be.visible');
    });
});
