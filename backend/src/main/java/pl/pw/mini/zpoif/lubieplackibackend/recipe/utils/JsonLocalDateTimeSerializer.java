package pl.pw.mini.zpoif.lubieplackibackend.recipe.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.LocalDateTime;

public class JsonLocalDateTimeSerializer extends JsonSerializer {

    static private String getMonth(int monthNumber) {
        switch(monthNumber) {
            case 1:     return "stycznia";
            case 2:     return "lutego";
            case 3:     return "marca";
            case 4:     return "kwietnia";
            case 5:     return "maja";
            case 6:     return "czerwca";
            case 7:     return "lipca";
            case 8:     return "sierpnia";
            case 9:     return "września";
            case 10:    return "października";
            case 11:    return "listopada";
            case 12:    return "grudnia";
            default:    return "---";
        }
    }

    @Override
    public void serialize(Object o, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        final LocalDateTime date = (LocalDateTime) o;
        final String dateString =
                date.getDayOfMonth() + " " + getMonth(date.getMonthValue()) + " " + date.getYear() +
                " o " + date.getHour() + ":" + date.getMinute();
        jsonGenerator.writeString(dateString);
    }
}
