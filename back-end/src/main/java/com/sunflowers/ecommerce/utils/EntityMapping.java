package com.sunflowers.ecommerce.utils;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.converter.json.MappingJacksonValue;

public class EntityMapping {

    public static  MappingJacksonValue getSimpleBeanPropertyFilter(Object entities, String filterName, String... properties) {
        FilterProvider filterProvider = new SimpleFilterProvider().addFilter(filterName, SimpleBeanPropertyFilter.filterOutAllExcept(properties));
        MappingJacksonValue mapping = new MappingJacksonValue(entities);
        mapping.setFilters(filterProvider);
        return mapping;
    }
}
