package pl.pw.mini.zpoif.lubieplackibackend.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Rating;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.model.Recipe;
import pl.pw.mini.zpoif.lubieplackibackend.user.util.UserSerializer;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

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

    @Column(name = "security_token")
    @JsonIgnore
    private UUID securityToken;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Comment> comments;

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

    public UUID getSecurityToken() {
        return securityToken;
    }

    public void setSecurityToken(UUID securityToken) {
        this.securityToken = securityToken;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
