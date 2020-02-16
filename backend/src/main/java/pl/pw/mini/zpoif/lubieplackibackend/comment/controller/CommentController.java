package pl.pw.mini.zpoif.lubieplackibackend.comment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pw.mini.zpoif.lubieplackibackend.comment.service.CommentService;

import java.util.UUID;

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

    @PostMapping(path = "/recipe/{recipe_id}")
    public ResponseEntity postComment(@RequestHeader String securityTokenValue, @PathVariable Long recipe_id, @RequestBody String text) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(commentService.postComment(securityToken, recipe_id, text));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteComment(@RequestHeader String securityTokenValue, @PathVariable Long id) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        commentService.deleteComment(securityToken, id);
        return ResponseEntity.ok("Usunięto komentarz");
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity updateComment(@RequestHeader String securityTokenValue, @PathVariable Long id, @RequestBody String text) {
        UUID securityToken = UUID.fromString(securityTokenValue);
        return ResponseEntity.ok(commentService.updateComment(securityToken, id, text));
    }
}
