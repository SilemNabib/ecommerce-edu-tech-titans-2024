package com.sunflowers.ecommerce.utils;

import org.springframework.data.repository.CrudRepository;

import java.util.*;

public class RepositoryUtils {

    /**
     * Returns a set of entities given a set of keys and a repository.
     *
     * @param keys the keys of the entities to retrieve
     * @param repository the repository to retrieve the entities from
     * @param entityName the name of the entity to be shown in the exception message
     * @param <T> the type of the entity
     * @param <Y> the type of the key
     * @return a list of entities
     */
    public static <T, Y> List<T> getListOfEntities(Iterable<Y> keys, CrudRepository<T,Y> repository, String entityName) {
        List<T> entities = new ArrayList<>();
        for (Y key : keys) {
            T entity = repository.findById(key)
                    .orElseThrow(() -> new IllegalArgumentException(entityName + " not found " + key));
            entities.add(entity);
        }
        return entities;
    }

    /**
     * Returns a set of entities given a set of UUID keys as strings and a repository.
     *
     * @param keys the string keys of the entities to retrieve
     * @param repository the repository to retrieve the entities from
     * @param entityName the name of the entity to be shown in the exception message
     * @param <T> the type of the entity
     * @return a list of entities
     */
    public static <T> List<T> getListOfEntitiesUUID(Iterable<String> keys, CrudRepository<T,UUID> repository, String entityName) {
        List<T> entities = new ArrayList<>();
        for (String key : keys) {
            T entity = repository.findById(UUID.fromString(key))
                    .orElseThrow(() -> new IllegalArgumentException(entityName + " not found " + key));
            entities.add(entity);
        }
        return entities;
    }
}