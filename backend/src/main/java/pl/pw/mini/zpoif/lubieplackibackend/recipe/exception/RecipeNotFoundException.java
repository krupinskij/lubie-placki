package pl.pw.mini.zpoif.lubieplackibackend.recipe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class RecipeNotFoundException extends RuntimeException {

    public RecipeNotFoundException(String message) {
        super(message);
    }
    public RecipeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
