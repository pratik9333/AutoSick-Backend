const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwtAuthz = require("express-jwt-authz");
var axios = require("axios").default;
const User = require("../models/User.model");

const authConfig = {
  domain: "dev-7om2074of27y7qj5.jp.auth0.com",
  clientId: "1RZkMa0NOX8ZHJ8mRvxA62Jmbniijpns",
  audience: "https://autosick/api",
  clientSecret:
    "YwhmXDOuXVI-5LLmhMEBZp4dS46Qw91AR9CP13ARJFor6sMswheqM3cWmVMHbpDw",
};

const mgmtConfig = {
  clientId: "v9LPNWPv7evFT9lTlXLZTYxFLuamAgu5",
  clientSecret:
    "Z1ihTVhtBaMgza7sUtIryjqAp58IQQVvMDlMXPfwm0shmh3Xsmc4L1cTQpzt8D9d",
};

exports.authorizeAccessToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUriL: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

exports.checkExpertPermissions = jwtAuthz(["write:appointments"], {
  customScopeKey: "permissions",
});

const getMgmtAccessToken = () => {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: `https://${authConfig.domain}/oauth/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: mgmtConfig.clientId,
        client_secret: mgmtConfig.clientSecret,
        audience: `https://dev-7om2074of27y7qj5.jp.auth0.com/api/v2/`,
      }),
    };
    axios
      .request(options)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

exports.updateUserMetadata = (user_id, metadata) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mgmtTkn = await getMgmtAccessToken();
      const user = await User.findOne({ user_id: user_id });
      var options = {
        method: "PATCH",
        url: `https://${authConfig.domain}/api/v2/users/${user_id}`,
        headers: {
          authorization: `Bearer ${mgmtTkn.access_token}`,
          "content-type": "application/json",
        },
        data: {
          user_metadata: metadata,
        },
      };

      axios
        .request(options)
        .then(function () {
          updateUserTags(
            user_id,
            mgmtTkn.access_token,
            user.role == "CLIENT" ? ["rol_eT51wzWKWT7IvDXF"] : []
          )
            .then(async () => {
              user.role = user.role == "CLIENT" ? "EXPERT" : "CLIENT";
              await user.save();
              resolve();
            })
            .catch(reject);
        })
        .catch(function (error) {
          reject(error);
        });
    } catch (err) {
      console.log(err);
    }
  });
};

const updateUserTags = (user_id, mgmtTkn, roles) => {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: `https://${authConfig.domain}/api/v2/users/${user_id}/roles`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${mgmtTkn}`,
        "cache-control": "no-cache",
      },
      data: { roles: roles },
    };

    axios
      .request(options)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
