package fr.uha.ensisa.alphapair.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SuppressWarnings("serial")
public class APIException extends Exception {
	private ResponseEntity<Object> responseEntity;
	
	public APIException(HttpStatus statusCode, Object payload) {
		super();
		this.responseEntity = new ResponseEntity<Object>(payload, statusCode);
	}
	
	public ResponseEntity<Object> getResponseEntity() {
		return this.responseEntity;
	}
}
