const {clone, extend} = require('lodash');


context('Tamara Task 2', () => {
    describe('Verify API abilities', () => {

        const getRequest = (options = {}) => {
            const defaultOptions = {
                auth: {
                     bearer: Cypress.env('accessToken'),
                },
            };
            return extend(defaultOptions, options);
        };

        const randomNumber = Math.floor(Math.random() * 1000);
        let name = `TestUserName ${randomNumber}`
        let email = `testTamara.email${randomNumber}@test.com`
        let gender;
        
        let id;
        

        it('Create user', () => {
            cy.fixture('createUser.json').then((apiTest) => {
                const reqBody = clone(apiTest);
                reqBody.name = name;
                reqBody.email = email;
                const requestOptions = getRequest({
                    method: 'POST',
                    body: reqBody,
                    url: 'https://gorest.co.in/public/v1/users',
                });
                cy.request(requestOptions)
                .then((resp) => {
                    gender = resp.body.data.gender;
                    expect(resp.status).to.eq(201);
                    expect(resp.body.data.name).to.eq(name);
                    expect(resp.body.data.email).to.eq(email);
                    expect(resp.body.data.gender).to.eq(gender);
                    id = resp.body.data.id;
                });
            });
        });

        it('Update user', () => {
            cy.fixture('createUser.json').then((apiTest) => {
                const reqBody = clone(apiTest);
                reqBody.name = `TestUserName ${randomNumber}`;
                reqBody.email = `testTamara.email${randomNumber}@test.com`;
                reqBody.gender = 'female';
                const requestOptions = getRequest({
                    method: 'PATCH',
                    body: reqBody,
                    url: `https://gorest.co.in/public/v1/users/${id}`,
                });
                cy.request(requestOptions)
                .then((resp) => {
                    gender = resp.body.data.gender;
                    expect(resp.status).to.eq(200);
                    expect(resp.body.data.name).to.eq(name);
                    expect(resp.body.data.email).to.eq(email);
                    expect(resp.body.data.gender).to.eq(gender);
                    id = resp.body.data.id;

                });
            });
        });

        it('Delete user', () => {
            cy.fixture('createUser.json').then((apiTest) => {
                const reqBody = clone(apiTest);
                const requestOptions = getRequest({
                    method: 'DELETE',
                    body: reqBody,
                    url: `https://gorest.co.in/public/v1/users/${id}`,
                });
                cy.request(requestOptions)
                .then((resp) => {
                    expect(resp.status).to.eq(204);
                });
            });
        });
     });
 });
