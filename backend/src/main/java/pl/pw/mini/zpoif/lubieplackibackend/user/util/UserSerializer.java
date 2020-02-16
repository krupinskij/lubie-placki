package pl.pw.mini.zpoif.lubieplackibackend.user.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import java.io.IOException;

public class UserSerializer extends JsonSerializer {
    @Override
    public void serialize(Object o, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        final User user = (User)o;
        user.setPassword(null);
        user.setSecurityToken(null);
        jsonGenerator.writeObject(user);
    }
}
