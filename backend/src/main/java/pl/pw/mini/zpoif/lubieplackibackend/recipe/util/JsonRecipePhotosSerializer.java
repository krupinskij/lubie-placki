package pl.pw.mini.zpoif.lubieplackibackend.recipe.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.RecipePhoto;

import java.io.IOException;
import java.util.List;

public class JsonRecipePhotosSerializer extends JsonSerializer {
    @Override
    public void serialize(Object o, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        final List<RecipePhoto> recipePhotos = (List<RecipePhoto>) o;
        jsonGenerator.writeNumber(recipePhotos.size());
    }
}
