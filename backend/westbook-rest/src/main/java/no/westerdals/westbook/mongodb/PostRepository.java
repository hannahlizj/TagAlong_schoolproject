package no.westerdals.westbook.mongodb;

import no.westerdals.westbook.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String>
{
    List<Post> getByUserId(String userId);
    List<Post> getByTagsTagId(String tagId);
    List<Post> getByTagsTagId(String tagId, Pageable pageable);
    List<Post> getByPageId(String pageId);
}
