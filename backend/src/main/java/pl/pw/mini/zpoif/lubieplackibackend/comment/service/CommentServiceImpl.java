package pl.pw.mini.zpoif.lubieplackibackend.comment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.comment.exception.CommentNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;
import pl.pw.mini.zpoif.lubieplackibackend.comment.repository.CommentRepository;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.exception.RecipeNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.repository.RecipeRepository;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UnauthorizedException;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private RecipeRepository recipeRepository;

    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, RecipeRepository recipeRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }

    @Override
    public List<Comment> getCommentsByUserId(Long user_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Nie ma takiego użytkownika"));

        List<Comment> comments = user.getComments();
        comments.sort(Comparator.comparing(Comment::getAdd_date));
        return comments;
    }

    @Override
    public List<Comment> getCommentsByRecipeId(Long recipe_id) {
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie ma takiego przepisu"));

        List<Comment> comments = recipe.getComments();
        comments.sort(Comparator.comparing(Comment::getAdd_date));
        return comments;
    }

    @Override
    public Comment postComment(UUID securityToken, Long recipe_id, String text) {
        User user = userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Zaloguj się na swoje konto"));
        Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RecipeNotFoundException("Nie ma takiego przepisu"));

        Comment comment = new Comment();
        comment.setText(text);
        comment.setAdd_date(LocalDateTime.now());
        comment.setUser(user);
        comment.setRecipe(recipe);

        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(UUID securityToken, Long id) {
        userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Nie jesteś właścicielem tego komentarza"));
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException("Nie ma takiego komentarza"));

        commentRepository.delete(comment);
    }

    @Override
    public Comment updateComment(UUID securityToken, Long id, String text) {
        userRepository.findBySecurityToken(securityToken).orElseThrow(() -> new UnauthorizedException("Nie jesteś właścicielem tego komentarza"));
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException("Nie ma takiego komentarza"));

        comment.setText(text);
        return commentRepository.save(comment);
    }


}
