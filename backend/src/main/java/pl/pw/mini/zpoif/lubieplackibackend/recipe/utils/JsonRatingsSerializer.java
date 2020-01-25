package pl.pw.mini.zpoif.lubieplackibackend.recipe.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Rating;

import java.io.IOException;
import java.util.List;

public class JsonRatingsSerializer extends JsonSerializer {

    @Override
    public void serialize(Object o, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        final List<Rating> ratings = (List<Rating>) o;
        double average = 0.0;
        int count = 0;

        for (Rating rating : ratings) {
            average +=rating.getRating();
            count++;
        }

        if(count!=0) average/=count;

        jsonGenerator.writeArray(new double[] { average, count }, 0, 2);
    }
}
