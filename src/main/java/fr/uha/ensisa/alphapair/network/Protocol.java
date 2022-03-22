package fr.uha.ensisa.alphapair.network;

public class Protocol {
	private static final int REPLY_COMMON_START			= 0000;

    public static final int REPLY_OK					= REPLY_COMMON_START+1;
	public static final int REPLY_DB_ERROR				= REPLY_COMMON_START+2;
	public static final int REPLY_AUTH_ERROR			= REPLY_COMMON_START+3;

}
