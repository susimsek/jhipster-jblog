package com.therealdanvega.service;

import com.therealdanvega.domain.Post;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Post}.
 */
public interface PostService {

    /**
     * Save a post.
     *
     * @param post the entity to save.
     * @return the persisted entity.
     */
    Post save(Post post);

    /**
     * Get all the posts.
     *
     * @return the list of entities.
     */
    List<Post> findAll();


    /**
     * Get the "id" post.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Post> findOne(Long id);

    /**
     * Delete the "id" post.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
