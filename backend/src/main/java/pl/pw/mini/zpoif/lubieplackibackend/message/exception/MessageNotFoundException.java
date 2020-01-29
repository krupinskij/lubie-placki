package pl.pw.mini.zpoif.lubieplackibackend.message.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class MessageNotFoundException extends RuntimeException {

    public MessageNotFoundException(String message) {
        super(message);
    }
    public MessageNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}


