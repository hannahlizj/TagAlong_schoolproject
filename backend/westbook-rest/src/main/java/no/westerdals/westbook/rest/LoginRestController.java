package no.westerdals.westbook.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class LoginRestController {
    @RequestMapping(value="/login", method=RequestMethod.GET)
    public Principal authenticated(Principal principal) {
        return principal;
    }
}
