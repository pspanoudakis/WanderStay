package com.backend.server.utils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class DateUtils {

    public static Short getDaysBetween(Date d1, Date d2) {
        if (d1 != null && d2 != null) {
            return (short) ChronoUnit.DAYS.between(
                d1.toInstant(), d2.toInstant()
            );
        }
        return 0;
    }

    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.FIELD})
    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Europe/Athens"
    )
    @JacksonAnnotationsInside
    public @interface JsonFormatLocalDate {}

    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.FIELD})
    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Europe/Athens"
    )
    @JacksonAnnotationsInside
    public @interface JsonFormatLocalDateTime {}
}
