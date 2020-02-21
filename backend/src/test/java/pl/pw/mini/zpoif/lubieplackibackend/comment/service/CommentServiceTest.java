package pl.pw.mini.zpoif.lubieplackibackend.comment.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
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
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
public class CommentServiceTest {

    @Mock CommentRepository commentRepository;
    @Mock UserRepository userRepository;
    @Mock RecipeRepository recipeRepository;

    @Spy
    @InjectMocks
    CommentServiceImpl commentService;

    private LocalDateTime getRandomDate() {
        Random random = new Random();
        return LocalDateTime.of(
                random.nextInt(50) + 1975,
                random.nextInt(11)+1,
                random.nextInt(20)+1,
                random.nextInt(23),
                random.nextInt(59)
        );
    }

    private List<Comment> getComments(int count) {
        List<Comment> comments = new ArrayList<>();

        for(int i=0; i<count; i++) {
            Comment comment = new Comment();
            comment.setAdd_date(getRandomDate());

            comments.add(comment);
        }

        return comments;
    }

    @Test
    public void getCommentsByUserId_AssignedUserId_ReturnSortedComments() {

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            commentService.getCommentsByUserId(1L);
            fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            assertEquals("Nie znaleziono użytkownika", ex.getMessage());
        }
    }

    @Test
    public void getCommentsByUserId_UnassignedUserId_ThrowUserNotFoundException() {

        List<Comment> comments = getComments(10);
        List<Comment> sortedComments = comments.stream().sorted(Comparator.comparing(Comment::getAdd_date)).collect(Collectors.toList());

        User user = new User();
        user.setComments(comments);

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        List<Comment> returnedComments = commentService.getCommentsByUserId(1L);
        assertEquals(sortedComments, returnedComments);
    }

    @Test
    public void getCommentsByRecipeId_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            commentService.getCommentsByRecipeId(1L);
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void getCommentsByRecipeId_AssignedRecipeId_ReturnSortedComments() {

        List<Comment> comments = getComments(10);
        List<Comment> sortedComments = comments.stream().sorted(Comparator.comparing(Comment::getAdd_date)).collect(Collectors.toList());

        Recipe recipe = new Recipe();
        recipe.setComments(comments);

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        List<Comment> returnedComments = commentService.getCommentsByRecipeId(1L);
        assertEquals(sortedComments, returnedComments);
    }

    @Test
    public void postComment_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            commentService.postComment(UUID.randomUUID(), 1L, "text");
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void postComment_UnassignedRecipeId_ThrowRecipeNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            commentService.postComment(UUID.randomUUID(), 1L, "text");
            fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            assertEquals("Nie znaleziono przepisu", ex.getMessage());
        }
    }

    @Test
    public void postComment__ReturnComment() {

        User user = new User();
        Recipe recipe = new Recipe();

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        Comment returnedComment = commentService.postComment(UUID.randomUUID(), 1L, "text");
        assertEquals("text", returnedComment.getText());
        assertEquals(user, returnedComment.getUser());
        assertEquals(recipe, returnedComment.getRecipe());
    }

    @Test
    public void deleteComment_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            commentService.deleteComment(UUID.randomUUID(), 1L);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void deleteComment_UnassignedRecipeId_ThrowCommentNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            commentService.deleteComment(UUID.randomUUID(), 1L);
            fail("Should throw CommentNotFoundException");
        } catch (CommentNotFoundException ex) {
            assertEquals("Nie znaleziono komentarza", ex.getMessage());
        }
    }

    @Test
    public void deleteComment_UnassignedComment_ThrowUnauthorizedException() {

        Comment comment = new Comment();
        comment.setUser(new User());

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(comment));

        try {
            commentService.deleteComment(UUID.randomUUID(), 1L);
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nie jesteś właścicielem tego komentarza", ex.getMessage());
        }
    }

    @Test
    public void updateComment_UnassignedSecurityToken_ThrowUnauthorizedException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.empty());

        try {
            commentService.updateComment(UUID.randomUUID(), 1L, "text");
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Zaloguj się", ex.getMessage());
        }
    }

    @Test
    public void updateComment_UnassignedRecipeId_ThrowCommentNotFoundException() {

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            commentService.updateComment(UUID.randomUUID(), 1L, "text");
            fail("Should throw CommentNotFoundException");
        } catch (CommentNotFoundException ex) {
            assertEquals("Nie znaleziono komentarza", ex.getMessage());
        }
    }

    @Test
    public void updateComment_UnassignedComment_ThrowUnauthorizedException() {

        Comment comment = new Comment();
        comment.setUser(new User());

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(new User()));
        Mockito.when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(comment));

        try {
            commentService.updateComment(UUID.randomUUID(), 1L, "text");
            fail("Should throw UnauthorizedException");
        } catch (UnauthorizedException ex) {
            assertEquals("Nie jesteś właścicielem tego komentarza", ex.getMessage());
        }
    }

    @Test
    public void updateComment_NewText_ReturnComment() {

        User user = new User();
        Comment comment = new Comment();
        comment.setUser(user);
        comment.setText("text");

        Mockito.when(userRepository.findBySecurityToken(Mockito.any())).thenReturn(Optional.of(user));
        Mockito.when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(comment));

        Comment returnedComment = commentService.updateComment(UUID.randomUUID(), 1L, "new text");
        assertEquals(comment, returnedComment);
        assertEquals("new text", returnedComment.getText());
    }

}