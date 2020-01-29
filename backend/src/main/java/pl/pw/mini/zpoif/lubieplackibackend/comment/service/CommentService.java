package pl.pw.mini.zpoif.lubieplackibackend.comment.service;

import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsByUserId(Long user_id);
    List<Comment> getCommentsByRecipeId(Long recipe_id);

    Comment postComment(Long recipe_id, Long user_id, String text);

    void deleteComment(Long id);

    Comment updateComment(Long id, String text);

    Comment likeComment(Long id);
}
