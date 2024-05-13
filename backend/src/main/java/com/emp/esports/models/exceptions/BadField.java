package com.emp.esports.models.exceptions;

public class BadField extends Exception{
    public BadField(){
        super();
    }

    public BadField(String message){
        super(message);
    }

    public BadField(String message, Throwable cause){
        super(message, cause);
    }

    public BadField(Throwable cause){
        super(cause);
    }
}

