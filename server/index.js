const jwt = require('jsonwebtoken');
const express = require('express');
const crypto = require("crypto");

const secret = 'nD5nTT6hK0BZBv6Qbt5RRo55IK71LwCRb2nNOVDiQm4OpjKG'; // replace with your own secret from the dashboard

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/authenticate', (req, res) => {
  const reqUserName = req.body.userName;
  const reqUserEmail = req.body.userEmail;
  const reqAccountId = req.body.accountId;
  const reqSkyWayPlan = req.body.skywayPlan;
  const reqContractId = req.body.contractId;
  const reqProjectId = req.body.projectId;
  const reqCompanyName = req.body.companyName;
  const sessionToken = req.body.sessionToken;

  if (reqUserName === undefined || reqUserEmail === undefined || sessionToken === undefined) {
    res.status(400).send('Bad Request');
    return;
  }

  // Check the sessionToken for your app.
  if(sessionToken != '4CXS0f19nvMJBYK05o3toTWtZF5Lfd2t6Ikr2lID') { 
    res.status(401).send('Authentication Failed');
  }

  const iat = Math.floor(Date.now() / 1000);

  const credential = {
    jti: crypto.randomUUID(),
    iat: iat,
    name: reqUserName,
    email: reqUserEmail,
    external_id: reqAccountId,
    user_fields: {
      skywayPlan: reqSkyWayPlan,
      ContractId: reqContractId,
      ProjectId: reqProjectId,
      CompanyName: reqCompanyName
    }
  }
/*
    iat: iat,
    name: reqUserName,
    email: reqUserEmail,
    external_id: reqAccountId,
    skywayPlan: reqSkyWayPlan,
    ContractId: reqContractId,
    ProjectId: reqProjectId,
    CompanyName: reqCompanyName,
    authToken: calculateAuthToken(iat, reqUserName, reqUserEmail, reqAccountId, reqSkyWayPlan, reqContractId, reqProjectId, reqCompanyName)
    };
*/
  credential.authToken = calculateAuthToken(credential);

  res.send(credential);
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${listener.address().port}`)
});

//const calculateAuthToken = (iat, name, email, accountId, skywayPlan, contractId, projectId, companyName) => {
const calculateAuthToken = (credential) => {
  return jwt.sign(
  /*{
    jti: crypto.randomUUID(),
    iat: iat,
    name: name,
    email: email,
    external_id: accountId,
    user_fields: {
      skywayPlan: skywayPlan,
      ContractId: contractId,
      ProjectId: projectId,
      CompanyName: companyName
    }
  }*/
  credential, secret);
}


