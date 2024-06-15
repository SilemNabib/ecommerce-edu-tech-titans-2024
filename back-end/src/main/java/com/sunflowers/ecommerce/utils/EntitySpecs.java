package com.sunflowers.ecommerce.utils;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class EntitySpecs {

    public static <T, Y> Specification<Y> hasAttribute(String attribute, T element) {
        if (element == null) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> cb.equal(root.get(attribute), element);
    }

    public static <T, Y> Specification<Y> hasAnyElement(String joinAttribute, String attribute, List<T> list) {
        if (list == null || list.isEmpty()) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> root.join(joinAttribute, JoinType.INNER).get(attribute).in(list);
    }

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

    public static <T extends Comparable<T>, Y> Specification<Y> hasAttributeGraterThan(String attribute, T element) {
        if (element == null) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get(attribute), element);
    }

    public static <T extends Comparable<T>, Y> Specification<Y> hasAttributeLessThan(String attribute, T element) {
        if (element == null) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get(attribute), element);
    }
}
