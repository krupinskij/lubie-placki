package pl.pw.mini.zpoif.lubieplackibackend.message.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.io.IOException;

public class JsonUserSerializer extends JsonSerializer {
    @Override
    public void serialize(Object o, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        User user = (User)o;

        jsonGenerator.writeString(user.getId() + "#" + user.getUsername());
    }
}
