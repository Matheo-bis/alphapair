const Protocol = {
	ADDRESS				: "http://localhost:8080",

    MISSING_TOKEN 		: 1,
	INVALID_TOKEN 		: 2,
	EXPIRED_TOKEN 		: 3,

	ALREADY_LOGGED_IN 	: 4,
	ALREADY_USED_MAIL 	: 5,
    BAD_CREDENTIALS 	: 6,

	NOT_ADMIN_USER		: 7,
	INVALID_ARGUMENT	: 8,
	PROMLESS_STUDENT	: 9,
	ADMIN_USER			: 10,
	
	// students
	UNKNOWN_ID			: "unknown"
};

export default Protocol;