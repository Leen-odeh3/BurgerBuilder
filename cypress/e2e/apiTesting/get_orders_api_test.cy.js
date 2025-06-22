describe('Get Orders by User ID from Firebase (Realtime DB)', () => {
  it('Should fetch orders for a specific user using Firebase token', () => {
    const url =
      'https://my-burger-builder-a0a3c.firebaseio.com/orders.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjNiZjA1MzkxMzk2OTEzYTc4ZWM4MGY0MjcwMzM4NjM2NDA2MTBhZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXktYnVyZ2VyLWJ1aWxkZXItYTBhM2MiLCJhdWQiOiJteS1idXJnZXItYnVpbGRlci1hMGEzYyIsImF1dGhfdGltZSI6MTc1MDU2ODE2MCwidXNlcl9pZCI6Ijg5N09INDF5eEpXeVk3b2pQTzM5cGs4cklyWjIiLCJzdWIiOiI4OTdPSDQxeXhKV3lZN29qUE8zOXBrOHJJcloyIiwiaWF0IjoxNzUwNTY4MTYwLCJleHAiOjE3NTA1NzE3NjAsImVtYWlsIjoiZ2hhbjRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImdoYW40QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.L4IYaVhimnJOqpS_54BV6kla26_YwiEl_NEtZD5KdtdsV_cVkL7UvN0sceh437mlwBid-eX00b3SfNZAf7DP1TLkpLjeaOudg6qGhbFdZ3AnME1fqffLVwGGNafOwK6VBwKPt5_v4nNowf_k2j-SYHZlV6qf40x7_m6oOExiqVpe7o3iVzIGVy2KkSvs7RLXkmSVRK33M3Tlpfmu52z5KzK8iTgLJ4fsygwqt44XSEJ6yisOI7Wz_S4ROWMmdrNGDqdpBeyYCfi5ElF2qvi8uAdaJmpGtcCPfjjqGz-wy4l3PGEmd_T4HuajZgdMKOK-8exJ9V5wvXFpVFY2EQvDvQ&orderBy=%22userId%22&equalTo=%22897OH41yxJWyY7ojPO39pk8rIrZ2%22';

    cy.request({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object');

      const orders = Object.values(response.body);

      if (orders.length > 0) {
        cy.log(`Found ${orders.length} orders for this user`);

        orders.forEach(order => {
          expect(order).to.have.property('userId', '897OH41yxJWyY7ojPO39pk8rIrZ2');
        });

      } else {
        cy.log('No orders found for this user');
      }
    });
  });
});
