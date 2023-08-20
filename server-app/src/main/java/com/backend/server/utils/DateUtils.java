package com.backend.server.utils;

import java.time.temporal.ChronoUnit;
import java.util.Date;

public class DateUtils {

    public static Short getDaysBetween(Date d1, Date d2) {
        if (d1 != null && d2 != null) {
            return (short) ChronoUnit.DAYS.between(
                d1.toInstant(), d2.toInstant()
            );
        }
        return 0;
    }
}
