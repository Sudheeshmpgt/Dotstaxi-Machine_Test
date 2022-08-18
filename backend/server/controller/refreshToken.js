
const UserToken = require("../model/userToken");   
const jwt = require( "jsonwebtoken");
const {verifyRefreshToken} = require( "../util/verifyRefreshToken");
const { refreshTokenValidation } = require( "../util/validationSchema");


// get new access token
const getNewAccesstoken = async (req, res) => {
	const { error } = refreshTokenValidation(req.body);
	if (error) 
		return res
			.status(400)
			.json({error: error.details[0].message });

	verifyRefreshToken(req.body.refreshToken)
		.then(({ tokenDetails }) => {
			const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
			const accessToken = jwt.sign(
				payload,
				process.env.ACCESS_TOKEN_PRIVATE_KEY, 
				{ expiresIn: "14m" }
			);
			res.status(200).json({
				error: false,
				accessToken,
				message: "Access token created successfully",
			});
		})
		.catch((err) => res.status(400).send(err));
};

// logout
const logout = async (req, res) => {
	try {
		const { error } = refreshTokenValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const userToken = await UserToken.findOne({ token: req.body.refreshToken });
		if (!userToken)
			return res
				.status(200)
				.json({message: "Logged Out Sucessfully" });

		await userToken.remove();
		res.status(200).json({ message: "Logged Out Sucessfully" });
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = {getNewAccesstoken, logout}