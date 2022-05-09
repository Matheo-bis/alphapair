package fr.uha.ensisa.alphapair.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

import fr.uha.ensisa.alphapair.exception.APIException;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;

public class TokenManager {
	
	/*@Autowired
	private PropertyManager pm;*/

	//public static final String issuer = /*pm.getProperty("TOKEN_ISSUER");*/"AlphaPair";
	public static final String issuer = new PropertyManager().getProperty("TOKEN_ISSUER");
	public static final String secret = new PropertyManager().getProperty("TOKEN_SECRET");
	public static final Algorithm algorithm = Algorithm.HMAC256(secret);
	public static final long accessTokenLifespan = 1000 * 60 * 10;
	
	public static String getUserMailFromToken(String token, boolean requiresAdmin) throws APIException {
		try {
			DecodedJWT decodedJWT = JWT.require(algorithm)
					.withIssuer(issuer)
					.build().verify(token);
			// we now have a valid token. But we may have to check if current user has proper admin privileges

			if (requiresAdmin && !decodedJWT.getClaim("isAdmin").toString().replace("\"", "").equals("true")) {
				throw new Exception();
			}
			
			
			return decodedJWT.getClaim("mail").toString().replace("\"", ""); // toString() gives "string" instead of string
		} catch (TokenExpiredException e) {
			// expired token
			System.out.println("expired token !");
			throw new APIException(HttpStatus.UNAUTHORIZED, Protocol.EXPIRED_TOKEN);
		} catch (JWTVerificationException e) {
			// invalid token
			System.out.println("invalid token !");
			throw new APIException(HttpStatus.UNAUTHORIZED, Protocol.INVALID_TOKEN);
		} catch (Exception e) {
			// non admin user tried to perform an admin-requiring request.
			System.out.println("admin was required but current user is not admin.");
			throw new APIException(HttpStatus.UNAUTHORIZED, Protocol.NOT_ADMIN_USER);
			
		}
	}
	
	public static String generateAccessTokenFromUser(User user) {
		return JWT.create()
				.withIssuer(issuer)
				.withIssuedAt(new Date())
				.withClaim("tokenType", "accessToken")
				.withExpiresAt(new Date(new Date().getTime() + accessTokenLifespan))
				.withClaim("mail", user.getMail())
				.withClaim("isAdmin", String.valueOf(user.getIsAdmin()))
				.sign(algorithm);
	}
	
	public static String generateRefreshTokenFromUser(User user) {
		return JWT.create()
				.withIssuer(issuer)
				.withIssuedAt(new Date())
				.withClaim("tokenType", "refreshToken")
				.withClaim("mail", user.getMail())
				.withClaim("isAdmin", String.valueOf(user.getIsAdmin()))
				.sign(algorithm);
	}
	
}
