let authToken;

window.onload = () => {
  document.querySelector('#get-btn').onclick = async () => {
    const userName = document.querySelector('#user-name-text').value;
    const userEmail = document.querySelector('#user-email-text').value;
    const contractId = document.querySelector('#contractId-text').value;
    const projectId = document.querySelector('#projectId-text').value;
    const accountId = document.querySelector('#accountId-text').value;
    const companyName = document.querySelector('#companyName-text').value;
    const skywayPlan = document.querySelector('#skywayPlan-text').value;
    const ssoLinkArea = document.querySelector('#ssoLink');

    // POST request to auth server.
    const response = await fetch('http://localhost:8080/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionToken: '4CXS0f19nvMJBYK05o3toTWtZF5Lfd2t6Ikr2lID',
        userName: userName,
        userEmail: userEmail,
        contractId: contractId,
        projectId: projectId,
        skywayPlan: skywayPlan,
        accountId: accountId,
        companyName: companyName
      })
    });

    if (response.ok) {
      const credential = await response.json();
      console.log(credential);
      authToken = credential.authToken;
      document.querySelector('#result').textContent = JSON.stringify(credential, null, 2);
      document.querySelector('#get-btn').textContent = "Done!"
    } else {
      alert("Request failed: " + response.statusText);
    }

    const ssoLink = document.createElement("a");
    ssoLink.href = 'https://skywaysupport1692332073.zendesk.com/access/jwt?jwt='+authToken+'&return_to=https://skywaysupport1692332073.zendesk.com/hc/ja/requests/new?ticket_form_id=22347949997081';
    ssoLink.innerText = 'LogIn';
    ssoLinkArea.appendChild(ssoLink);

  };

  document.querySelector('#copy-btn').onclick = async () => {
    await navigator.clipboard.writeText(authToken);
    document.querySelector('#copy-btn').textContent = "Copied!"
  };
};
