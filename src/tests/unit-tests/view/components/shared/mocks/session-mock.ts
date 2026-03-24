export function unitTestSessionMock() {
  return beforeEach(() => {
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: {
        user: {
          id: "123",
          name: "Intercepted User",
          email: "intercepted@example.com",
        },
        expires: "2099-12-31T23:59:59.999Z",
      },
    }).as("getSession");
  });
}
