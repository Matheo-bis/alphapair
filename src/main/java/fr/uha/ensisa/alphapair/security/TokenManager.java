package fr.uha.ensisa.alphapair.security;

import java.util.Date;

import org.springframework.http.HttpStatus;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;

import fr.uha.ensisa.alphapair.exception.APIException;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;

public class TokenManager {

	public static final String issuer = "AlphaPair";
	public static final String secret = "Bonjour";
	public static final Algorithm algorithm = Algorithm.HMAC256(secret);
	
	public static String getUserMailFromAccessToken(String accessToken) throws APIException {
		try {
			DecodedJWT decodedJWT = JWT.require(algorithm)
					.withIssuer(issuer)
					.build().verify(accessToken);
			// valid token
			return decodedJWT.getClaim("mail").toString().replace("\"", ""); // toString() gives "string" instead of string
		} catch (TokenExpiredException e) {
			// expired token
			System.out.println("expired token !");
			throw new APIException(HttpStatus.UNAUTHORIZED, Protocol.EXPIRED_TOKEN);
		} catch (JWTVerificationException e) {
			// invalid token
			System.out.println("invalid token !");
			throw new APIException(HttpStatus.UNAUTHORIZED, Protocol.INVALID_TOKEN);
		}
	}

	public static String generateAccessTokenFromUser(User user) {
		return JWT.create()
				.withIssuer(issuer)
				.withIssuedAt(new Date())
				//.withExpiresAt(new Date(new Date() + 1000))
				.withClaim("mail", user.getMail())
				.sign(algorithm);
	}
	
}
