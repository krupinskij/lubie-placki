package pl.pw.mini.zpoif.lubieplackibackend.comment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;
import pl.pw.mini.zpoif.lubieplackibackend.comment.service.CommentService;

import java.util.List;

@RestController
@RequestMapping(path = "/comments")
@CrossOrigin
public class CommentController {
    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(path = "/user/{user_id}")
    public ResponseEntity getCommentsByUserId(@PathVariable Long user_id) {
        return ResponseEntity.ok(commentService.getCommentsByUserId(user_id));
    }

    @GetMapping(path = "/recipe/{recipe_id}")
    public ResponseEntity getCommentsByRecipeId(@PathVariable Long recipe_id) {
        return ResponseEntity.ok(commentService.getCommentsByRecipeId(recipe_id));
    }

    @PostMapping(path = "/recipe/{recipe_id}/user/{user_id}")
    public ResponseEntity postComment(@PathVariable Long recipe_id, @PathVariable Long user_id, @RequestBody String text) {
        return ResponseEntity.ok(commentService.postComment(recipe_id, user_id, text));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok("Usunięto komentarz");
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity updateComment(@PathVariable Long id, @RequestBody String text) {
        return ResponseEntity.ok(commentService.updateComment(id, text));
    }
}
