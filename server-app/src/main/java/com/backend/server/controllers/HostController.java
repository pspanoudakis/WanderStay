package com.backend.server.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/host")
@PreAuthorize("hasAuthority('HOST')")
@RequiredArgsConstructor
public class HostController {
    
}
