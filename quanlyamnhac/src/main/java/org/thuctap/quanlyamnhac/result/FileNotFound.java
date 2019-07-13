package org.thuctap.quanlyamnhac.result;

@SuppressWarnings("serial")
public class FileNotFound extends RuntimeException {
    public FileNotFound(String message) {
        super(message);
    }

    public FileNotFound(String message, Throwable cause) {
        super(message, cause);
    }
}
