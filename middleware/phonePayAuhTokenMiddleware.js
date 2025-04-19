import axios from "axios";

const getAuthTokenFromCookies = (req) => {
  const cookies = req.cookies || {};
  const token = cookies.phonepe_token;
  const expiry = cookies.phonepe_token_expiry;
  if (token && expiry && Date.now() < Number(expiry)) {
    return token;
  }
  return null;
};

const fetchPhonePeAuthToken = async () => {
  const client_id = "TEST-M22SNF0PTNPQ0_25041";
  const client_secret = "MWNiZGRkYjctNjUzZC00YTVlLTg5M2YtOWQ5YWE5NDcwMTI3";

  const response = await axios.post(
    "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
    null,
    {
      params: {
        client_id,
        client_secret,
        client_version: "1",
        grant_type: "client_credentials",
      },
    }
  );

  const { access_token, expires_in } = response.data;
  return {
    token: access_token,
    expiry: Date.now() + expires_in * 1000,
  };
};

export const getPhonePeToken = async (req, res, next) => {
  let token = getAuthTokenFromCookies(req);

  if (!token) {
    try {
      const { token: newToken, expiry } = await fetchPhonePeAuthToken();
      res.cookie("phonepe_token", newToken, { httpOnly: true });
      res.cookie("phonepe_token_expiry", expiry.toString(), { httpOnly: true });
      req.phonepeToken = newToken;
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to fetch PhonePe token", details: err.message });
    }
  } else {
    console.log("token",token)
    req.phonepeToken = token;
  }

  next();
};
