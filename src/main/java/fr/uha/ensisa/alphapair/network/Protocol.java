package fr.uha.ensisa.alphapair.network;

public class Protocol {
	// tokens
	public static final int MISSING_TOKEN 		= 1;
	public static final int INVALID_TOKEN 		= 2;
	public static final int EXPIRED_TOKEN 		= 3;
	
	// connexion / inscription
	public static final int ALREADY_LOGGED_IN 	= 4;
	public static final int ALREADY_USED_MAIL 	= 5;
	public static final int BAD_CREDENTIALS 	= 6;
	
	// contenu
	public static final int NOT_ADMIN_USER 		= 7;
	public static final int INVALID_ARGUMENT	= 8;

}
