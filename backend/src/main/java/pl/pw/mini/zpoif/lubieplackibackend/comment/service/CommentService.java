package pl.pw.mini.zpoif.lubieplackibackend.comment.service;

import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;

import java.util.List;
import java.util.UUID;

public interface CommentService {
    List<Comment> getCommentsByUserId(Long user_id);
    List<Comment> getCommentsByRecipeId(Long recipe_id);

    Comment postComment(UUID securityToken, Long recipe_id, String text);

    void deleteComment(UUID securityToken, Long id);

    Comment updateComment(UUID securityToken, Long id, String text);
}
