package fr.uha.ensisa.alphapair.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.persistence.AttributeConverter;

public class ListToStringConverter implements AttributeConverter<List<String>, String> {
    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        return attribute.size() == 0 ? "" : String.join(",",attribute);
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        return dbData == "" ? new ArrayList<String>() : Arrays.asList(dbData.split(","));
    }
}