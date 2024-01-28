package base.beans;

import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor

public class ErrorResponse {
	
    HttpStatus httpStatus;
    String message;
    
    public ErrorResponse(HttpStatus httpStatus, String message) {
    	this.httpStatus = httpStatus;
    	this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
