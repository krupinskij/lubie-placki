package pl.pw.mini.zpoif.lubieplackibackend.recipe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class RecipePhotoNotFoundException extends RuntimeException {

    public RecipePhotoNotFoundException(String message) {
        super(message);
    }
    public RecipePhotoNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
