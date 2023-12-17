package com.cnpm.bookingbackend.models.hotelattributemodels;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "property_types")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyType {
    @Id
    private String id;
    private String image;
    private String name;
    private String label;
}
