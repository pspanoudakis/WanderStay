package com.backend.server.utils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class DateUtils {

    private static final String APP_TIMEZONE_ID = "Europe/Athens";

    private static Instant toInstant(Date d) {
        if (d instanceof java.sql.Date) {
            var sqlDate = (java.sql.Date)d;
            return sqlDate.toLocalDate().atStartOfDay(
                ZoneId.of(APP_TIMEZONE_ID)
            ).toInstant();
        }
        return d.toInstant();
    }

    public static Short getDaysBetween(Date d1, Date d2) {
        if (d1 != null && d2 != null) {
            return (short) ChronoUnit.DAYS.between(
                toInstant(d1), toInstant(d2)
            );
        }
        return 0;
    }

    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.FIELD})
    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = APP_TIMEZONE_ID
    )
    @JacksonAnnotationsInside
    public @interface JsonFormatLocalDate {}

    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.FIELD})
    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = APP_TIMEZONE_ID
    )
    @JacksonAnnotationsInside
    public @interface JsonFormatLocalDateTime {}
}
