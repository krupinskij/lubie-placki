package pl.pw.mini.zpoif.lubieplackibackend.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;
import pl.pw.mini.zpoif.lubieplackibackend.message.model.Message;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Rating;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String username;

    @Column
    private String password;

    @ElementCollection
    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Recipe> recipes;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Rating> ratings;

    @JsonIgnore
    private byte[] avatar;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private List<Message> sended_messages;

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private List<Message> received_messages;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Message> getSended_messages() {
        return sended_messages;
    }

    public void setSended_messages(List<Message> sended_messages) {
        this.sended_messages = sended_messages;
    }

    public List<Message> getReceived_messages() {
        return received_messages;
    }

    public void setReceived_messages(List<Message> received_messages) {
        this.received_messages = received_messages;
    }
}
