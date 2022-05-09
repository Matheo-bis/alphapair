package fr.uha.ensisa.alphapair.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Controller
public class IndexController {
    @RequestMapping(value = {"/{path:[^\\.]*}", "/class/**"})
    public String redirect() {
        return "forward:/";
    }
}