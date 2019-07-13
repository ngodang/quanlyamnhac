package org.thuctap.quanlyamnhac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.thuctap.quanlyamnhac.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	List<Category> findByCategorynameLike(String categoryname);
}
