package com.sunflowers.ecommerce.utils;

import org.springframework.data.repository.CrudRepository;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class RepositoryUtils {

    /**
     * Returns a set of entities given a set of keys and a repository.
     *
     * @param keys the keys of the entities to retrieve
     * @param repository the repository to retrieve the entities from
     * @param entityName the name of the entity to be shown in the exception message
     * @param <T> the type of the entity
     * @param <Y> the type of the key
     * @return a set of entities
     */
    public static <T, Y> Set<T> getSetOfEntities(Iterable<Y> keys, CrudRepository<T,Y> repository, String entityName) {
        Set<T> entities = new HashSet<>();
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
     * @return a set of entities
     */
    public static <T> Set<T> getSetOfEntitiesUUID(Iterable<String> keys, CrudRepository<T,UUID> repository, String entityName) {
        Set<T> entities = new HashSet<>();
        for (String key : keys) {
            T entity = repository.findById(UUID.fromString(key))
                    .orElseThrow(() -> new IllegalArgumentException(entityName + " not found " + key));
            entities.add(entity);
        }
        return entities;
    }
}
