package pl.pw.mini.zpoif.lubieplackibackend.message.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pl.pw.mini.zpoif.lubieplackibackend.message.util.JsonLocalDateTimeSerializer;
import pl.pw.mini.zpoif.lubieplackibackend.message.util.JsonUserSerializer;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name="messages")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    @JsonSerialize(using = JsonLocalDateTimeSerializer.class)
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name="receiver_id")
    private User receiver;

    @ManyToOne
    @JoinColumn(name="sender_id")
    private User sender;

    public Message() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }
}
