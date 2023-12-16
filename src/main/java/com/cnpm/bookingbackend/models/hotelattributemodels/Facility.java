package com.cnpm.bookingbackend.models.hotelattributemodels;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "facilities")
@Data
public class Facility {
    @Id
    private String id;
    private String icon;
    private String name;
    private String label;
}
