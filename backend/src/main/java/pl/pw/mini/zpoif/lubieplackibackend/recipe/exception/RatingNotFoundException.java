package pl.pw.mini.zpoif.lubieplackibackend.recipe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class RatingNotFoundException extends RuntimeException {

    public RatingNotFoundException(String message) {
        super(message);
    }
    public RatingNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
