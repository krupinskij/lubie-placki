/*
package pl.pw.mini.zpoif.lubieplackibackend.comment.controller;

import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import pl.pw.mini.zpoif.lubieplackibackend.comment.exception.CommentNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;
import pl.pw.mini.zpoif.lubieplackibackend.comment.repository.CommentRepository;
import pl.pw.mini.zpoif.lubieplackibackend.comment.service.CommentService;
import pl.pw.mini.zpoif.lubieplackibackend.comment.service.CommentServiceImpl;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.exception.RecipeNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.repository.RecipeRepository;
import pl.pw.mini.zpoif.lubieplackibackend.user.exception.UserNotFoundException;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;
import pl.pw.mini.zpoif.lubieplackibackend.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class CommentControllerTest {

    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private RecipeRepository recipeRepository;

    private CommentService commentService;

    @Test
    void givenExistingUser_whenGetCommentsByUserId_thenAccept() {

        User user = new User();
        List<Comment> comments = new ArrayList<>();
        comments.add(new Comment());
        user.setComments(comments);

        commentRepository = Mockito.mock(CommentRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        recipeRepository = Mockito.mock(RecipeRepository.class);

        commentService = new CommentServiceImpl(
                commentRepository,
                userRepository,
                recipeRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(user));

        List<Comment> returnedComments = commentService.getCommentsByUserId(1L);

        Assert.assertThat(returnedComments, Matchers.hasSize(1));
    }

    @Test
    void givenNotExistingUser_whenGetCommentsByUserId_thenThrowUserNotFoundException() {

        commentRepository = Mockito.mock(CommentRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        recipeRepository = Mockito.mock(RecipeRepository.class);

        commentService = new CommentServiceImpl(
                commentRepository,
                userRepository,
                recipeRepository
        );

        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            List<Comment> returnedComments = commentService.getCommentsByUserId(1L);
            Assert.fail("Should throw UserNotFoundException");
        } catch (UserNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego użytkownika");
        }
    }

    @Test
    void givenExistingRecipe_whenGetCommentsByRecipeId_thenAccept() {

        Recipe recipe = new Recipe();
        List<Comment> comments = new ArrayList<>();
        comments.add(new Comment());
        recipe.setComments(comments);

        commentRepository = Mockito.mock(CommentRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        recipeRepository = Mockito.mock(RecipeRepository.class);

        commentService = new CommentServiceImpl(
                commentRepository,
                userRepository,
                recipeRepository
        );

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(recipe));

        List<Comment> returnedComments = commentService.getCommentsByRecipeId(1L);

        Assert.assertThat(returnedComments, Matchers.hasSize(1));
    }

    @Test
    void givenNotExistingRecipe_whenGetCommentsByUserId_thenThrowRecipeNotFoundException() {

        commentRepository = Mockito.mock(CommentRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        recipeRepository = Mockito.mock(RecipeRepository.class);

        commentService = new CommentServiceImpl(
                commentRepository,
                userRepository,
                recipeRepository
        );

        Mockito.when(recipeRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            List<Comment> returnedComments = commentService.getCommentsByRecipeId(1L);
            Assert.fail("Should throw RecipeNotFoundException");
        } catch (RecipeNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego przepisu");
        }
    }

    @Test
    void givenExistingComment_whenDeleteComment_thenAccept() {

        Comment comment = new Comment();

        commentRepository = Mockito.mock(CommentRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        recipeRepository = Mockito.mock(RecipeRepository.class);

        commentService = new CommentServiceImpl(
                commentRepository,
                userRepository,
                recipeRepository
        );

        Mockito.when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(comment));

        commentService.deleteComment(1L);

    }

    @Test
    void givenNotExistingComment_whenDeleteComment_thenThrowCommentNotFoundException() {

        commentRepository = Mockito.mock(CommentRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        recipeRepository = Mockito.mock(RecipeRepository.class);

        commentService = new CommentServiceImpl(
                commentRepository,
                userRepository,
                recipeRepository
        );

        Mockito.when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        try {
            commentService.deleteComment(1L);
            Assert.fail("Should throw CommentNotFoundException");
        } catch(CommentNotFoundException ex) {
            Assert.assertEquals(ex.getMessage(), "Nie ma takiego komentarza");
        }

    }

    @Test
    void givenExistingComment_whenUpdateComment_thenChangText() {

        Comment comment = new Comment();
        comment.setText("Text1");

        commentRepository = Mockito.mock(CommentRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        recipeRepository = Mockito.mock(RecipeRepository.class);

        commentService = new CommentServiceImpl(
                commentRepository,
                userRepository,
                recipeRepository
        );

        Mockito.when(commentRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(comment));
        Mockito.when(commentRepository.save(Mockito.any())).thenReturn(comment);

        Comment returnedComment = commentService.updateComment(1L, "Text2");

        Assert.assertEquals(returnedComment.getText(), "Text2");

    }
}*/
