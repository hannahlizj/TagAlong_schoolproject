package no.westerdals.westbook.mongodb;

import com.mongodb.BasicDBObject;
import javafx.geometry.Pos;
import no.westerdals.westbook.model.Post;
import no.westerdals.westbook.model.Upvote;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Query.*;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class PostRepositoryImpl implements PostRepositoryCustom {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Post> filterPosts(String parentId, String[] tagIds, Pageable pageable) {
        Query query = new Query();
        if (tagIds != null && tagIds.length > 0) {
            query.addCriteria(where("tagIds").in((Object[]) tagIds));
        }
        if (parentId != null) {
            query.addCriteria(where("parentId").is(parentId));
        }
        if (pageable != null) {
            query.with(pageable);
        }
        return mongoTemplate.find(query, Post.class);
    }

    // TODO: Use returnNew so we can reload just one post, and without a extra request
    @Override
    public Post upvotePost(String postId, Upvote upvote) {
        Update update = new Update();
        update.push("upvotes", upvote);
        return mongoTemplate.findAndModify(query(where("_id").is(new ObjectId(postId))), update, Post.class);
    }

    @Override
    public Post removePostUpvote(String postId, String userId) {
        Update update = new Update();
        update.pull("upvotes", new BasicDBObject("userId", userId));
        return mongoTemplate.findAndModify(query(where("_id").is(new ObjectId(postId))), update, Post.class);
    }
}
