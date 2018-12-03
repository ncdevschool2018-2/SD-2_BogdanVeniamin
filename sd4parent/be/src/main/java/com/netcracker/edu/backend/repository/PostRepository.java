package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entity.Addition;
import com.netcracker.edu.backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Set;

@Repository
public interface PostRepository extends CrudRepository<Post, Long>, JpaSpecificationExecutor<Post>, PagingAndSortingRepository<Post, Long> {

//    @Modifying
    @Transactional
    @Query("update Post post set post.additions = :additions where post.id = :id")
    void addAddition(@Param("id") Long id, @Param("additions") Set<Addition> additions);

}
