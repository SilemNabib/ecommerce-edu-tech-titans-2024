package com.sunflowers.ecommerce.utils;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class EntitySpecs {

    /**
     * Creates a specification that checks if an attribute is equal to a given element.
     * The element must not be null. if it is, the specification will return a conjunction (true).
     *
     * @param attribute the attribute to check
     * @param element   the element to compare the attribute to
     * @param <T>       the type of the element
     * @param <Y>       the type of the entity
     * @return a specification that checks if the attribute is equal to the element
     */
    public static <T, Y> Specification<Y> hasAttribute(String attribute, T element) {
        if (element == null) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> cb.equal(root.get(attribute), element);
    }

    /**
     * Creates a specification that checks if an entity has any of the elements in a list (simple join).
     * The list must not be empty. if it is, the specification will return a conjunction (true).
     * The attribute must be a simple attribute (not a nested attribute).
     *
     * @param attribute the attribute to check
     * @param list      the list of elements to compare the attribute to
     * @param <T>       the type of the elements
     * @param <Y>       the type of the entity
     * @return a specification that checks if the attribute is equal to any of the elements in the list
     */
    public static <T, Y> Specification<Y> hasAnyElement(String joinAttribute, String attribute, List<T> list) {
        if (list == null || list.isEmpty()) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> root.join(joinAttribute, JoinType.INNER).get(attribute).in(list);
    }

    /**
     * Creates a specification that checks if an entity has all the elements in a list (simple join).
     * The list must not be empty. if it is, the specification will return a conjunction (true).
     * The attribute must be a simple attribute (not a nested attribute).
     *
     * @param attribute the attribute to check
     * @param list      the list of elements to compare the attribute to
     * @param <T>       the type of the elements
     * @param <Y>       the type of the entity
     * @return a specification that checks if the attribute is equal to all the elements in the list
     */
    public static <T, Y, Z> Specification<Y> hasAllElements(String joinAttribute, String attribute, List<T> list) {
        if (list == null || list.isEmpty()) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> {
            Join<Y, Z> join = root.join(joinAttribute, JoinType.INNER);
            for (T element : list) {
                query.where(cb.equal(join.get(attribute), element));
            }
            return query.getRestriction();
        };
    }

    /**
     * Creates a specification that checks if an attribute is greater than a given element.
     * The element must not be null. if it is, the specification will return a conjunction (true).
     *
     * @param attribute the attribute to check
     * @param element   the element to compare the attribute to
     * @param <T>       the type of the element
     * @param <Y>       the type of the entity
     * @return a specification that checks if the attribute is greater than the element
     */
    public static <T extends Comparable<T>, Y> Specification<Y> hasAttributeGraterThan(String attribute, T element) {
        if (element == null) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get(attribute), element);
    }

    /**
     * Creates a specification that checks if an attribute is less than a given element.
     * The element must not be null. if it is, the specification will return a conjunction (true).
     *
     * @param attribute the attribute to check
     * @param element   the element to compare the attribute to
     * @param <T>       the type of the element
     * @param <Y>       the type of the entity
     * @return a specification that checks if the attribute is less than the element
     */
    public static <T extends Comparable<T>, Y> Specification<Y> hasAttributeLessThan(String attribute, T element) {
        if (element == null) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get(attribute), element);
    }
}
