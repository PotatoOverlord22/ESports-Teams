package com.emp.esports.models.exceptions;

public class NotFound extends Exception{
    public NotFound(){
        super();
    }

    public NotFound(String message){
        super(message);
    }

    public NotFound(String message, Throwable cause){
        super(message, cause);
    }

    public NotFound(Throwable cause){
        super(cause);
    }
}

